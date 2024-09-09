import cv2
import pytesseract
from pytesseract import Output
import re

# Load the image from file
image_path = 'screenshot.png'  # Replace with your screenshot file path
image = cv2.imread(image_path)

# Convert the image to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply OCR to extract text from the image
custom_config = r'--oem 3 --psm 6'  # Set OCR engine mode and page segmentation mode
ocr_result = pytesseract.image_to_string(gray_image, config=custom_config)

# Split the OCR result into lines
lines = ocr_result.splitlines()

# Function to extract trip details from the OCR lines
def extract_trip_details(lines):
    trip_details = []
    trip_pattern = re.compile(r'(\d{1,2}/\d{1,2}/\d{2,4}).*?(\d{1,2}:\d{2}\s?(?:AM|PM)).*?(\$\d+\.\d{2})')

    for line in lines:
        match = trip_pattern.search(line)
        if match:
            trip_date = match.group(1)
            trip_time = match.group(2)
            trip_amount = match.group(3)
            trip_details.append({
                'Date': trip_date,
                'Time': trip_time,
                'Amount': trip_amount
            })

    return trip_details

# Extract the trip details
trip_details = extract_trip_details(lines)

# Display the extracted trip details
for i, trip in enumerate(trip_details, start=1):
    print(f"Trip {i}:")
    print(f"  Date: {trip['Date']}")
    print(f"  Time: {trip['Time']}")
    print(f"  Amount: {trip['Amount']}")
    print()

# Optionally, save the trip details to a CSV file
import csv

csv_filename = 'trip_details.csv'
with open(csv_filename, mode='w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=['Date', 'Time', 'Amount'])
    writer.writeheader()
    writer.writerows(trip_details)

print(f"Trip details saved to {csv_filename}")
