import sys

data_to_pass_back = "Riot API data."

input_file = sys.argv[1]
output = data_to_pass_back
print("(Python) Data from JavaScript: " + input_file)
print("(Python) Data from Python: " + data_to_pass_back)

sys.stdout.flush()
