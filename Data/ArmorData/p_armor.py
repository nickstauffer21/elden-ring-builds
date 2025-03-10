import json
import ast

# Function to reformat the "locations" and "drops" fields and create new objects
def reformat_and_create_new_objects(data):
    reformatted_data = []
    for item in data:
        try:
            # Convert the string representation of the lists to actual lists
            locations = ast.literal_eval(item["locations"])
            drops = ast.literal_eval(item["drops"])
        except (ValueError, SyntaxError) as e:
            print(f"Error parsing 'locations' or 'drops' for {item['name']}: {e}")
            continue

        # Create new objects for locations and drops
        new_locations = [{"location": loc} for loc in locations]
        new_drops = [{"drop": drp} for drp in drops]

        # Add the new objects to the item
        item["Locations"] = new_locations
        item["Drops"] = new_drops
        reformatted_data.append(item)

    return reformatted_data

# Read the JSON data from the file
with open('creatures.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Reformat the data and create new objects
reformatted_data = reformat_and_create_new_objects(data)


# Optionally, save the reformatted data back to a file
with open('reformatted_creatures.json', 'w', encoding='utf-8') as file:
    json.dump(reformatted_data, file, indent=4, ensure_ascii=False)
