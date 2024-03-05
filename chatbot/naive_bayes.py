import torch
from torch.utils.data import DataLoader, TensorDataset, RandomSampler, SequentialSampler
from transformers import BertTokenizer, BertForSequenceClassification, get_linear_schedule_with_warmup
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
from torch.optim import AdamW
import pandas as pd
import numpy as np

# Load the dataset
file_path = 'shuffled_islaimc_dataset_26_02_24.csv'
df = pd.read_csv(file_path)

# Convert topic names to numerical labels
label_encoder = LabelEncoder()
df['TopicLabel'] = label_encoder.fit_transform(df['Topic'])

# Initialize Multilingual BERT tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-uncased')

# Tokenize and encode sequences in the dataset
input_ids = []
attention_masks = []
for sentence in df['Question']:
    encoded_dict = tokenizer.encode_plus(
                    sentence,
                    add_special_tokens=True,
                    max_length=64,
                    padding='max_length',
                    truncation=True,
                    return_attention_mask=True,
                    return_tensors='pt',
                )
    input_ids.append(encoded_dict['input_ids'])
    attention_masks.append(encoded_dict['attention_mask'])

# Convert lists to tensors
input_ids = torch.cat(input_ids, dim=0)
attention_masks = torch.cat(attention_masks, dim=0)
labels = torch.tensor(df['TopicLabel'].values)

# Split data into train, validation, and test sets
train_inputs, temp_inputs, train_labels, temp_labels = train_test_split(input_ids, labels, random_state=2018, test_size=0.2)
train_masks, temp_masks, _, _ = train_test_split(attention_masks, labels, random_state=2018, test_size=0.2)

validation_inputs, test_inputs, validation_labels, test_labels = train_test_split(temp_inputs, temp_labels, random_state=2018, test_size=0.5)
validation_masks, test_masks, _, _ = train_test_split(temp_masks, temp_labels, random_state=2018, test_size=0.5)

# Set device to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# DataLoader setup
batch_size = 32
train_data = TensorDataset(train_inputs, train_masks, train_labels)
train_sampler = RandomSampler(train_data)
train_dataloader = DataLoader(train_data, sampler=train_sampler, batch_size=batch_size)

validation_data = TensorDataset(validation_inputs, validation_masks, validation_labels)
validation_sampler = SequentialSampler(validation_data)
validation_dataloader = DataLoader(validation_data, sampler=validation_sampler, batch_size=batch_size)

test_data = TensorDataset(test_inputs, test_masks, test_labels)
test_sampler = SequentialSampler(test_data)
test_dataloader = DataLoader(test_data, sampler=test_sampler, batch_size=batch_size)

# Model Initialization
num_labels = len(label_encoder.classes_)
model = BertForSequenceClassification.from_pretrained('bert-base-multilingual-uncased', num_labels=num_labels)
model.to(device)  # Move model to the specified device

# Optimizer and Scheduler
optimizer = AdamW(model.parameters(), lr=2e-5, eps=1e-8)
epochs = 5
total_steps = len(train_dataloader) * epochs
scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=total_steps)

# Training Loop
for epoch in range(epochs):
    model.train()
    total_train_loss = 0

    for batch in train_dataloader:
        batch = tuple(t.to(device) for t in batch)
        b_input_ids, b_input_mask, b_labels = batch
        model.zero_grad()
        
        outputs = model(b_input_ids, token_type_ids=None, attention_mask=b_input_mask, labels=b_labels)
        loss = outputs.loss
        total_train_loss += loss.item()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        scheduler.step()

    avg_train_loss = total_train_loss / len(train_dataloader)
    print(f'Epoch {epoch} - Average training loss: {avg_train_loss}')

    # Validation loop
    model.eval()
    total_eval_accuracy = 0
    total_eval_loss = 0
    for batch in validation_dataloader:
        batch = tuple(t.to(device) for t in batch)
        b_input_ids, b_input_mask, b_labels = batch
        
        with torch.no_grad():
            outputs = model(b_input_ids, token_type_ids=None, attention_mask=b_input_mask, labels=b_labels)
            
        loss = outputs.loss
        total_eval_loss += loss.item()

    avg_val_loss = total_eval_loss / len(validation_dataloader)
    print(f'Epoch {epoch} - Average validation loss: {avg_val_loss}')

# Save the entire model
torch.save(model.state_dict(), 'bert_model_full_26_02_24.pth')

# Testing
model.eval()
test_predictions, test_true_labels = [], []
for batch in test_dataloader:
    batch = tuple(t.to(device) for t in batch)
    b_input_ids, b_input_mask, _ = batch
    
    with torch.no_grad():
        outputs = model(b_input_ids, token_type_ids=None, attention_mask=b_input_mask)
    
    logits = outputs.logits
    logits = logits.detach().cpu().numpy()
    label_ids = b_labels.to('cpu').numpy()
    test_predictions.append(logits)
    test_true_labels.append(label_ids)

test_predictions = np.concatenate(test_predictions, axis=0)
test_true_labels = np.concatenate(test_true_labels, axis=0)
test_report = classification_report(test_true_labels, np.argmax(test_predictions, axis=1), target_names=label_encoder.classes_, zero_division=0)
print(test_report)
