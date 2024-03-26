import sys
import requests
import json

# =================================================================================================
# helper functions to make life easier 

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

# helper for getting player mastery from puuid
def getMasteryData(request, puuid, key):
    new_request = request + puuid + '?api_key=' + key
    accountData = requests.get(new_request)
    error = handle_error(accountData)
    if error:
        print(error)
        sys.exit()
    return accountData.json()

# function to get all player rank info
def getPlayerRank(request, id, key):
    new_request = request + id + '?api_key=' + key
    leagueData = requests.get(new_request)
    error = handle_error(leagueData)
    if error:
        print(error)
        sys.exit()
    return leagueData.json()

#================================================================================================
# starter variables
HASHMAP_DATA = {}
summoner, tag = 'Jeevi', '0001'
#summoner, tag = sys.argv[1], sys.argv[2]
api_key = 'RGAPI-b8f2c841-61f3-4f85-b525-1a1b00b43911'
accountRequest = 'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/'
summonerRequest = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/'
leagueRequest = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/'
masteryRequest = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/'

# getting summoner puuid from summoner name and tag
accountData = getSummonerData(accountRequest, summoner, tag, api_key)
puuid = accountData['puuid']
gameName = accountData['gameName']
tagLine = accountData['tagLine']

# getting icon from puuid 
summonerData = getPlayerData(summonerRequest, puuid, api_key)
iconID = summonerData['profileIconId']
summonerID = summonerData['id']

# getting top 3 mastery champs and their mastery points from puuid
masteryData = getMasteryData(masteryRequest, puuid, api_key) # WARMING: Data is HUGE

championID_first = 'N/A'
championID_first_mastery = 'N\A'
championID_second = 'N/A'
championID_third = 'N/A'
for i in range(3): # top 3 champs
    print(masteryData[i])


#get rank and tier from id
leagueData = getPlayerRank(leagueRequest, summonerID, api_key)
soloTier = 'N/A'
soloRank = 'N/A'
soloLP = 'N/A'
flexTier = 'N/A'
flexRank = 'N/A'
flexLP = 'N/A'

for i in range(len(leagueData)):
    if leagueData[i].get('queueType') == 'RANKED_SOLO_5x5':
        # solo data 
        soloTier = leagueData[i]['tier']
        soloRank = leagueData[i]['rank']
        soloLP = leagueData[i]['leaguePoints']
    else: 
        # flex data
        flexTier = leagueData[i]['tier']
        flexRank = leagueData[i]['rank']
        flexLP = leagueData[i]['leaguePoints']


#================================================================================================
# sending data to httpserver.js in json format

#account data
HASHMAP_DATA['gameName'] = gameName
HASHMAP_DATA['tagLine'] = tagLine
HASHMAP_DATA['iconID'] = iconID
# rank solo data 
HASHMAP_DATA['soloTier'] = soloTier
HASHMAP_DATA['soloRank'] = soloRank
HASHMAP_DATA['soloLP'] = soloLP
#rank flex data
HASHMAP_DATA['flexTier'] = flexTier
HASHMAP_DATA['flexRank'] = flexRank
HASHMAP_DATA['flexLP'] = flexLP

json_data = json.dumps(HASHMAP_DATA) # converts data into json file to send
#print(json_data)
sys.stdout.flush()
