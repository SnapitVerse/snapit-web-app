import requests
import time
from randomWord import getRandomWords

url = 'http://localhost:3030/api/mint'

def mint(start, end):
    print('Starting with: ', start)
    for id in range(start, end+1):
        name = getRandomWords(2)
        description = getRandomWords(10)
        data = {
            "owner_address": "0xE64a7ebD9512cdb79c2928DcA2B6E54140D8975c",
            "token_id": id,
            "metadata": {
                "name": name,
                "kind": 1,
                "description": description,
                "image": "",
                "properties": {
                    "prop1": "prop1"
                }
            }
        }
        print('Sending id: ', id)
        response = requests.post(url, json=data)
        # Print the status code of the response
        print(f'Status Code: {response.status_code}')
        # Print the content of the response
        print(f'Response Content: {response.text}')
        time.sleep(0.5)

mint(81,100)