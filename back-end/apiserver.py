import sys
import requests
import json

# function to handle errors
def handle_error(response):
    ERROR_HASHMAP = {}
    status_code = response.status_code
    if status_code == 200:
        return False
    if status_code in [400, 404]:
        ERROR_HASHMAP['status'] = 'Not Found'
    elif status_code in [401, 403]:
        ERROR_HASHMAP['status'] = 'Expired'
    else:
        ERROR_HASHMAP['status'] = 'Error'
    return json.dumps(ERROR_HASHMAP)

# helper gets summoner data from name and tag
def getSummonerData(request, name, tag, key):
    new_request = request + name + '/' + tag + '?api_key=' + key
    accountData = requests.get(new_request)
    error = handle_error(accountData)
    if error:
        print(error)
        sys.exit()
    return accountData.json()

# helper gets player data from puuid
def getPlayerData(request, puuid, key):
    new_request = request + puuid + '?api_key=' + key
    accountData = requests.get(new_request)
    error = handle_error(accountData)
    if error:
        print(error)
        sys.exit()
    return accountData.json()


HASHMAP_DATA = {}
#summoner, tag = 'Jeevi', '0001'
summoner, tag = sys.argv[1], sys.argv[2]
api_key = 'RGAPI-b8f2c841-61f3-4f85-b525-1a1b00b43911'
accountRequest = 'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/'
summonerRequest = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/'

# getting summoner puuid from summoner name and tag
accountData = getSummonerData(accountRequest, summoner, tag, api_key)
puuid = accountData['puuid']

# getting icon from puuid 
summonerData = getPlayerData(summonerRequest, puuid, api_key)
iconID = summonerData['profileIconId'] 

#================================================================================================
# sending data to httpserver.js in json format
HASHMAP_DATA['puuid'] = puuid
HASHMAP_DATA['iconID'] = iconID
json_data = json.dumps(HASHMAP_DATA) # converts data into json file to send
print(json_data)
sys.stdout.flush()
