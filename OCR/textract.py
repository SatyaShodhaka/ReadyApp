import boto3
import re

def detect_text(file_path):
    # Initialize the Textract client
    client = boto3.client('textract')

    # Read the document content
    with open(file_path, 'rb') as document:
        image_bytes = document.read()

    # Call Textract to detect text
    response = client.detect_document_text(
        Document={'Bytes': image_bytes}
    )

    # Extract detected words
    detected_words = []
    for item in response['Blocks']:
        if item['BlockType'] == 'LINE':
            detected_words.append(item['Text'])

    print(detected_words)
    return detected_words

def extract_trip_details(detected_words):
    earnings_pattern = re.compile(r'\$\d+\.\d{2}')  # Example: "$5.99"
    time_pattern = re.compile(r'\b\d{1,2}:\d{2} (?:AM|PM)\b')  # Example: "6:39 PM"
    uber_type_pattern = re.compile(r'UberX|UberXL|UberPool')  # Uber types
    duration_pattern = re.compile(r'\d+ min \d+ sec')  # Example: "11 min 20 sec"
    distance_pattern = re.compile(r'\d+\.\d+ mi')  # Example: "4.9 mi"
    # Simplified location pattern for debugging
    location_pattern = re.compile(r'.*MN\s+\d{5}(-\d{4})?,?\s*us\b', re.IGNORECASE)

    trip_details = []
    current_trip = {}
    location_count = 0

    i = 0
    while i < len(detected_words):
        word = detected_words[i]

        if earnings_pattern.match(word):
            # Save the current trip and start a new one
            if current_trip:
                trip_details.append(current_trip)
                current_trip = {}
                location_count = 0  # Reset location count for the new trip
            current_trip['Earnings'] = word
        elif time_pattern.match(word):
            current_trip['Time'] = word
        elif uber_type_pattern.search(word) and (duration_pattern.search(word) or distance_pattern.search(word)):
            current_trip['Uber Type'] = uber_type_pattern.search(word).group(0)
            if duration_pattern.search(word):
                current_trip['Duration'] = duration_pattern.search(word).group(0)
            if distance_pattern.search(word):
                current_trip['Distance'] = distance_pattern.search(word).group(0)
        elif location_pattern.match(word):
            print(f"Location detected: {word}")  # Debug print to see what's detected
            if location_count == 0:
                current_trip['Start Location'] = word
                location_count += 1
            elif location_count == 1:
                current_trip['End Location'] = word
                location_count += 1

        i += 1  # Move to the next word

    # Append the last trip if it exists
    if current_trip:
        trip_details.append(current_trip)

    return trip_details

# Example usage
file_path = 'images/image.png'  # Replace with your image file path
detected_words = detect_text(file_path)
trip_details = extract_trip_details(detected_words)

# Display the extracted trip details
for index, trip in enumerate(trip_details, 1):
    print(f"### Trip {index}")
    print(f"- **Fare:** {trip.get('Earnings', 'N/A')}")
    print(f"- **Time:** {trip.get('Time', 'N/A')}")
    print(f"- **Trip Type:** {trip.get('Uber Type', 'N/A')}")
    print(f"- **Duration:** {trip.get('Duration', 'N/A')}")
    print(f"- **Distance:** {trip.get('Distance', 'N/A')}")
    print(f"- **Start Location:** {trip.get('Start Location', 'N/A')}")
    print(f"- **End Location:** {trip.get('End Location', 'N/A')}\n")
