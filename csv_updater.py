import sys

def write_user_data(keyList, valueList, row, accuracy):
    # Replace 'your_csv_file.csv' with the path to your CSV file
    csv_file_path = 'analytics.csv'

    # Read the CSV file into a DataFrame
    df = pd.read_csv(csv_file_path)
    
    df.at[row, "teamScore"] = accuracy
    
    
    # Iterate through the dictionary and update the DataFrame
    for i in range(len(keyList)):
        if keyList[i] in df.columns:
            # Word already exists as a column, update the specified row
            df.at[row, keyList[i]] += valueList[i]
        else:
            # Word doesn't exist as a column, create a new column in row 0
            df[keyList[i]] = 0  # Set the initial value (0) for the new column
            # Update the value in the specified row
            df.at[row, keyList[i]] = valueList[i]
    
    # Save the updated DataFrame back to the CSV file
    df.to_csv(csv_file_path, index=False)

if __name__ == "__main__":
    if len(sys.argv) == 5:
        function_name = sys.argv[1]
        keyLisT = sys.argv[2]
        valList = sys.argv[3]
        rowNum = sys.argv[4]
        accNum = sys.argv[5]

        if function_name == "write_user_data":
            write_user_data(keyLisT, valList, rowNum, accNum)
        else:
            print("Function not found.")
    else:
        print("Usage: python your_script.py function_name arg1 arg2")












