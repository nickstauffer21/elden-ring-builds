import json

def split_upgrade_field(data):
  new_data = []
  for item in data:
    upgrade = item.get("upgrade", "").strip()
    
    if "+" in upgrade:
      affinity, level = upgrade.split("+", 1)
      level = f"+{level.strip()}"
    else:
      affinity = upgrade.strip()
      level = "+0"
      
    new_item = {
      **item,
      "affinity": affinity,
      "upgrade": level
    }
    new_data.append(new_item)
  return new_data

with open("processed_weapons_upgrades.json", "r") as file:
  data = json.load(file)

new_json = split_upgrade_field(data)

with open("p_weapons_upgrades.json", "w") as file:
  json.dump(new_json, file)

print("ayyaa")