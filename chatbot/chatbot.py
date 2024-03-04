import torch
from transformers import BertTokenizer
from sklearn.preprocessing import LabelEncoder
import pandas as pd

# Initialize the tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-uncased')

# Load the label encoder
label_encoder = LabelEncoder()
label_encoder.classes_ = pd.read_csv('label_classes.csv')['Topic'].values

# Load the full model
model_path = 'bert_model_full.pth' 
model = torch.load(model_path)
model.eval()

def predict_topic(text):
    # Tokenize and encode the text
    encoded_dict = tokenizer.encode_plus(
                        text,
                        add_special_tokens=True,
                        max_length=64,
                        padding='max_length',
                        truncation=True,
                        return_attention_mask=True,
                        return_tensors='pt',
                    )

    # Get the input IDs and attention mask
    input_ids = encoded_dict['input_ids']
    attention_mask = encoded_dict['attention_mask']

    # Make the prediction
    with torch.no_grad():
        outputs = model(input_ids, token_type_ids=None, attention_mask=attention_mask)
        logits = outputs.logits
        predicted_label_idx = torch.argmax(logits, dim=1).item()

    # Decode the predicted label
    predicted_label = label_encoder.inverse_transform([predicted_label_idx])[0]
    return predicted_label

# Run the chatbot
if __name__ == "__main__":
    print("Islamic Topic Categorization Chatbot. Type 'quit' to exit.")
    while True:
        user_input = input("Enter a question or topic: ")
        if user_input.lower() == 'quit':
            break
        topic = predict_topic(user_input)
        print(f"Predicted Topic: {topic}")
