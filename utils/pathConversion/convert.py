import re
import json

input_file = 'input.txt'  # Your input file with SVG paths
output_file = 'output.json'  # The output JSON file

# Regular expression to match the path data and extract the 'd' attribute
path_regex = re.compile(r'<path class="cls-1" d="([^"]+)"\/>')

segments = []

with open(input_file, 'r') as file:
    for line in file:
        match = path_regex.search(line)
        if match:
            # Extract the path data
            path_data = match.group(1)
            # Append to the list as a dictionary
            segments.append({"d": path_data})

# Adding segment IDs
for i, segment in enumerate(segments, start=1):
    segment['id'] = f"segment-{i}"

# Writing the list of dictionaries to a JSON file
with open(output_file, 'w') as json_file:
    json.dump(segments, json_file, indent=2)

print(f"Output JSON is written to {output_file}")
