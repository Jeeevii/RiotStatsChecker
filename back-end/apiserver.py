import sys
import requests
import json

# function to handle errors
def handle_error(response):
    status_code = response.status_code
    if status_code == 200:
        return 'OK'
    if status_code == 404:
        return "Summoner name and tag don't exist, please try again"
    elif status_code in [401, 403]:
        return "API Key is expired!"
    else:
        return "An unexpected error occurred"

# function to get icon from that puuid
def getPlayerIcon(request, puuid, key):
    new_request = request + puuid + '?api_key=' + key
    return requests.get(new_request)

SENDING_DATA_HASHMAP = {}
summoner, tag = sys.argv[1], sys.argv[2]
api_key = 'RGAPI-b8f2c841-61f3-4f85-b525-1a1b00b43911'
accountRequest = 'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + summoner + '/' + tag + '?api_key=' + api_key
summonerRequest = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/'

# getting summoner puuid from summoner name and tag
accountData = requests.get(accountRequest)
if handle_error(accountData) != 'OK':
    print(handle_error(accountData))
    sys.exit()

playerInfo = accountData.json()
puuid = playerInfo['puuid']
SENDING_DATA_HASHMAP['puuid'] = puuid

# getting icon from puuid 
summonerData = getPlayerIcon(summonerRequest, puuid, api_key)
if handle_error(summonerData) != 'OK':
    print(handle_error(summonerData))
    sys.exit()
  
playerInfo = summonerData.json()
iconID = playerInfo['profileIconId'] 
SENDING_DATA_HASHMAP['iconID'] = iconID

json_data = json.dumps(SENDING_DATA_HASHMAP) # converts data into json file to send
print(json_data)

sys.stdout.flush()
