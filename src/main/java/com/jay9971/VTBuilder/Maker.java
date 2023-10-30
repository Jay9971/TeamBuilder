package com.jay9971.VTBuilder;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class Maker {
	
	
	public static String serialize(int num) {
		String n = "";
		if (num < 10) {
			n += "0" + num;
		} else {
			n += num;
		}
		return n;
	}
	
	
	public static int[] getCSVRowInt(String csvFilePath, int row) {
		int[] vals = new int[getNumberOfColumns(csvFilePath)];
		
		for (int i=0; i < getNumberOfColumns(csvFilePath); i++) {
			vals[i] = getCSVValue(csvFilePath, row, i);
		}
		
		return vals;
	}
	
	public static String[] getCSVRowStr(String csvFilePath, int row) {
		String[] vals = new String[getNumberOfColumns(csvFilePath)];
		
		for (int i=0; i < getNumberOfColumns(csvFilePath); i++) {
			vals[i] = getCSVValueStr(csvFilePath, row, i);
		}
		
		return vals;
	}
	
	
    public static String getCSVValueStr(String csvFilePath, int row, int column) {
        String value = null;

        try (BufferedReader br = new BufferedReader(new FileReader(csvFilePath))) {
            String line;
            int currentRow = 0;

            while ((line = br.readLine()) != null) {
                if (currentRow == row) {
                    String[] columns = line.split(",");
                    if (column < columns.length) {
                        value = columns[column];
                        break;
                    } else {
                        // Handle the case where the specified column is out of bounds
                        value = "Column index out of bounds";
                        break;
                    }
                }
                currentRow++;
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
        }

        return value;
    }
	
	
    public static int getCSVValue(String csvFilePath, int row, int column) {
        int value = 0; // Default value (you can change this as needed)

        try (BufferedReader br = new BufferedReader(new FileReader(csvFilePath))) {
            String line;
            int currentRow = 0;

            while ((line = br.readLine()) != null) {
                if (currentRow == row) {
                    String[] columns = line.split(",");
                    if (column < columns.length) {
                        try {
                            value = Integer.parseInt(columns[column]);
                        } catch (NumberFormatException e) {
                            // Handle the case where the value in the specified column is not a valid integer
                            value = 0; // Set a default value or handle the error as needed
                        }
                        break;
                    } else {
                        // Handle the case where the specified column is out of bounds
                        value = 0; // Set a default value or handle the error as needed
                        break;
                    }
                }
                currentRow++;
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
        }

        return value;
    }

    
    
    public static int getNumberOfColumns(String csvFilePath) {
        try (BufferedReader br = new BufferedReader(new FileReader(csvFilePath))) {
            String line;
            if ((line = br.readLine()) != null) {
                // Split the header line by commas to count columns
                String[] columns = line.split(",");
                return columns.length;
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
        }
        // Return -1 if an error occurred or the file is empty
        return -1;
    }
    
    public static int getNumberOfRows(String csvFilePath) {
        int rowCount = 0;

        try (BufferedReader br = new BufferedReader(new FileReader(csvFilePath))) {
            while (br.readLine() != null) {
                rowCount++;
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
        }

        return rowCount;
    }

}
