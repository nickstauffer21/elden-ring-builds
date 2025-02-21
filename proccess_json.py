import json
import ast

input_json = "Data/weapons.json"
output_json = "processed_weapons_info.json"

with open(input_json, 'r', encoding='utf-8') as file:
  weapons_upgrades_data = json.load(file)

for weapon_upgrade in weapons_upgrades_data:
  
  if "requirements" in weapon_upgrade:
    requirements = weapon_upgrade["requirements"]
    
    try:
      requirements_dict = ast.literal_eval(requirements)
      weapon_upgrade['requirements'] = requirements_dict
    except:
      print(f'Error parsing')

      
with open(output_json, 'w', encoding='utf-8') as file:
  json.dump(weapons_upgrades_data, file)

print(f"Processed")