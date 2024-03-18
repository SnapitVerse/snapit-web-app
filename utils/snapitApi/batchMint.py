import requests
import time
from randomWord import getRandomWords
import json
# url = 'https://test-api.snapit.world/api/mint'
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
                "description": description,
                "image": "https://nftimages.s3.eu-central-1.amazonaws.com/NFTs/image-" + str(id % 6)  + ".png",
                "external_url": "https://test.snapit.world",
                "attributes": [
                    {
                        "trait_type": getRandomWords(1),
                        "value": getRandomWords(1),
                    },
                    {
                        "trait_type": getRandomWords(1),
                        "value": getRandomWords(1),
                    },
                    {
                        "trait_type": getRandomWords(1),
                        "value": getRandomWords(1),
                    },
                ],
            },
            "wait_confirmation": True
        }
        print('Sending id: ', id)
        print(json.dumps(data, indent=2))
        response = requests.post(url, json=data)
        # Print the status code of the response
        print(f'Status Code: {response.status_code}')
        # Print the content of the response
        print(f'Response Content: {response.text}')
        time.sleep(0.5)

mint(6,6)