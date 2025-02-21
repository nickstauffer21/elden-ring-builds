import json
from collections import defaultdict

# Load JSON data from files
def load_json_file(filename):
    with open(filename, "r") as file:
        return json.load(file)

# Save merged JSON data to a file
def save_json_file(data, filename):
    with open(filename, "w") as file:
        json.dump(data, file, indent=4)

# Function to merge JSON objects with all upgrades for each weapon
def merge_all_upgrades(data):
    merged_data = defaultdict(lambda: {"upgrades": []})

    for item in data:
        # Use the weapon name or name to group upgrades
        name = item.get("weapon name") or item.get("name")
        if "upgrade" in item:
            # Append upgrade-related data into the upgrades list
            upgrade_info = {
                "upgrade": item["upgrade"],
                "attack_power": item.get("attack power", {}),
                "stat_scaling": item.get("stat scaling", {}),
                "damage_reduction": item.get("damage reduction (%)", {}),
                "affinity": item.get("affinity", "Standard")
            }
            merged_data[name]["upgrades"].append(upgrade_info)
        else:
            # Merge general weapon information
            for key, value in item.items():
                if key != "upgrade":  # Avoid overwriting upgrades
                    merged_data[name][key] = value

    # Sort fields to ensure general info comes before upgrades
    for key in merged_data:
        weapon_info = merged_data[key]
        ordered_weapon = {k: weapon_info[k] for k in weapon_info if k != "upgrades"}
        ordered_weapon["upgrades"] = weapon_info["upgrades"]
        merged_data[key] = ordered_weapon

    return list(merged_data.values())

# Load JSON files
file1_data = load_json_file("p_weapons_upgrades.json")  # Replace with your actual file names
file2_data = load_json_file("processed_weapons_info.json")

# Combine the data
combined_data = file1_data + file2_data

# Merge the JSON objects with all upgrades
merged_result = merge_all_upgrades(combined_data)

# Save the merged result to a new file
save_json_file(merged_result, "merged_result.json")

print("Merged JSON with ordered fields saved to 'merged_result.json'")
