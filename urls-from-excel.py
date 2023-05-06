import os
import pandas as pd
import re
import csv

# Folder path containing the Excel files
folder_path = 'folder_path'

# Regular expression pattern to extract URLs
url_pattern = r'https?://[^\s/$.?#].[^\s]*'

# Output CSV file name
output_file = 'urls.csv'

# Open the output CSV file for writing
with open(output_file, 'w', newline='', encoding='utf-8') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(['File', 'Column', 'URL'])  # Write header row to CSV
    
    # Get the list of files in the folder
    file_list = os.listdir(folder_path)
    
    # Loop through each file in the list
    for file in file_list:
        # Check if the file is an Excel file
        if file.endswith('.xlsx') or file.endswith('.xls'):
            # Construct the file path
            file_path = os.path.join(folder_path, file)
            
            # Read in the Excel file using pandas
            df = pd.read_excel(file_path)
            
            # Extract URLs from each column in the dataframe
            for col in df.columns:
                urls = []
                for cell in df[col]:
                    # Use regex to find all URLs in the cell
                    urls_in_cell = re.findall(url_pattern, str(cell))
                    # Add URLs to the list for this column
                    urls.extend(urls_in_cell)
                
                # Print the list of URLs to the console
                print(f'{file}, {col}:')
                for url in urls:
                    # Check if the URL contains invalid characters
                    if '›' not in url:
                        print(url)
                
                # Write the list of URLs to the CSV file
                for url in urls:
                    # Check if the URL contains invalid characters
                    if '›' not in url:
                        writer.writerow([file, col, url])
