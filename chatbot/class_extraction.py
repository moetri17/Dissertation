import pandas as pd

# Replace 'your_file.csv' with the path to your original CSV file
input_file_path = 'islaimc_dataset_26_02_24.csv'
# Define the path for the new CSV file
output_file_path = 'unique_topics.csv'

# Read the CSV file
df = pd.read_csv(input_file_path)

# Check if 'Topic' column exists
if 'Topic' in df.columns:
    # Extract the 'Topic' column and remove duplicates
    unique_topics = df['Topic'].drop_duplicates()

    # Save the unique topics to a new CSV file
    unique_topics.to_csv(output_file_path, index=False, header=True)
    print(f"Unique topics extracted and saved to '{output_file_path}'")
else:
    print("Column 'Topic' not found in the CSV file.")
