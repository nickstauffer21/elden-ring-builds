import csv
import json

csv_file_path = 'armors.csv'
json_file_path = 'armors.json'

with open(csv_file_path, mode='r', encoding="utf-8") as csv_file:
  csv_reader = csv.DictReader(csv_file)
  data = [row for row in csv_reader]
  
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
  json.dump(data, json_file)
  
print("Saved")