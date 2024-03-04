import pandas as pd

# Replace with your actual file path
file_path = 'islaimc_dataset_26_02_24.csv'

# Load the dataset
df = pd.read_csv(file_path)

# Shuffle the dataframe while keeping the rows intact
shuffled_df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# Save the shuffled dataframe back to a new CSV file, if needed
shuffled_df.to_csv('shuffled_islaimc_dataset_26_02_24.csv', index=False)
