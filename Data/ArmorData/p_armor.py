import json

# Load the JSON file
with open('armors.json', 'r') as file:
    data = json.load(file)

# Function to process damage negation and resistance
def process_item(item):
    if "damage negation" in item:
        item["damage negation"] = json.loads(item["damage negation"].replace("'", '"'))[0]
    if "resistance" in item:
        item["resistance"] = json.loads(item["resistance"].replace("'", '"'))[0]
    return item

# Process all items in the JSON
processed_data = [process_item(item) for item in data]



with open('processed_items.json', 'w') as outfile:
    json.dump(processed_data, outfile, indent=4)