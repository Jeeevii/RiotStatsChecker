import sys
import requests
import json
## Note: Outdated and no longer in use!


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

#Match ID Request Call: https://developer.riotgames.com/apis#match-v5
###Params: request =  riot games api location: (ie matchRequest)
# puuid = Unique summoner puuid 
# key = current APIKey
# count = Number of matches that we want to be returned
# Default Param: start = 0 (ie. get match IDs from the most recent matches the summoner has played)
# -- Note: Can expand to unique match types(ie flex, ranked, norms) 
### 
def getMatchIDs(request, puuid, key, count):
    new_request = request + puuid + '/ids/' + '?start=0&count=' + str(count) + '&api_key=' + key
    matchID = requests.get(new_request)
    error = handle_error(matchID)
    if error:
        print(error)
        sys.exit()
    return matchID.json()

def getMatchData(request, matchID, key):
    new_request = request + matchID + '?api_key=' + key
    matchData = requests.get(new_request)
    error = handle_error(matchData)
    if error:
        print(error)
        sys.exit()
    return matchData.json()

# get Match Stats of 5 recent matches
#Note: matchStats: queueID = Depicts which gameMode:
#QueueIDs: Id = 720 --> Clash, 450 --> ARAM, 440 --> FlexQ, 420 --> Solo, 400 --> Draft, ??? --> QuickPlay 
#1020 --> One For All, ??? --> URF, ??? --> ARURF, ??? --> Nexus Blitz
#Note: gameMode is pretty inconsistent as: Classic depicts Flex,SoloQ and Norms, Depicts Gamemodes Well(ie. Aram, OneForAll)
#Doesn't differentiate well with Clash(shows clash games as GameMode: ARAM?)
def getMatchStats():
    lst = []
    for i in matchesData:
        currMatchData = {}
        # Get Index of Participant
        index = matchesData[i]['metadata']['participants'].index(puuid)
        #Gets data of champ, KDA, win/lose
        currMatchData['champion'] =  matchesData[i]['info']['participants'][index]['championName']
        currMatchData['kills'] = matchesData[i]['info']['participants'][index]['kills']
        currMatchData['deaths'] =  matchesData[i]['info']['participants'][index]['deaths']
        currMatchData['assists'] =  matchesData[i]['info']['participants'][index]['assists']
        currMatchData['lane'] = matchesData[i]['info']['participants'][index]['lane']
        # currMatchData['role'] = matchesData[i]['info']['participants'][index]['role']
        currMatchData['win'] = matchesData[i]['info']['participants'][index]['win']
        # currMatchData['queueType'] =  matchesData[i]['info']['gameType']
        currMatchData['gameMode'] =  matchesData[i]['info']['gameMode']
        # currMatchData['gameName'] =  matchesData[i]['info']['gameName']
        currMatchData['queueId'] =  matchesData[i]['info']['queueId']
        lst.append(currMatchData)
    return lst


#================================================================================================
# starter variables
HASHMAP_DATA = {}
# summoner, tag = 'Jeevi', '0001'
summoner, tag = sys.argv[1], sys.argv[2]
api_key = 'RGAPI-a20a9e41-4a88-448b-ab94-20aef94eabac'
accountRequest = 'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/'
summonerRequest = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/'
leagueRequest = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/'
masteryRequest = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/'
matchIDRequest = 'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/'
matchDataRequest = 'https://americas.api.riotgames.com/lol/match/v5/matches/'
# getting summoner puuid from summoner name and tag
accountData = getSummonerData(accountRequest, summoner, tag, api_key)
puuid = accountData['puuid']
gameName = accountData['gameName']
tagLine = accountData['tagLine']

# getting icon from puuid 
summonerData = getPlayerData(summonerRequest, puuid, api_key)
iconID = summonerData['profileIconId']
summonerID = summonerData['id']
summonerLevel = summonerData['summonerLevel']

# getting top 3 mastery champs and their mastery points from puuid
masteryData = getMasteryData(masteryRequest, puuid, api_key) # WARNING: DATA IS HUGE

# first
champ1_ID = 'N/A'
champ1_mastery  = 'N\A'
# second
champ2_ID = 'N/A'
champ2_mastery = 'N\A'
# third
champ3_ID = 'N/A'
champ3_mastery = 'N\A'

for i in range(3): # top 3 champs
    if i == 0: 
        champ1_ID = masteryData[i]['championId'] 
        champ1_mastery = masteryData[i]['championPoints']
    elif i == 1:
        champ2_ID = masteryData[i]['championId'] 
        champ2_mastery = masteryData[i]['championPoints']
    elif i == 2:
        champ3_ID = masteryData[i]['championId'] 
        champ3_mastery = masteryData[i]['championPoints']


# get rank and tier from id
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
HASHMAP_DATA['summonerLevel'] = summonerLevel
#rank solo data 
HASHMAP_DATA['soloTier'] = soloTier
HASHMAP_DATA['soloRank'] = soloRank
HASHMAP_DATA['soloLP'] = soloLP
#rank flex data
HASHMAP_DATA['flexTier'] = flexTier
HASHMAP_DATA['flexRank'] = flexRank
HASHMAP_DATA['flexLP'] = flexLP
#champ and mastery data
HASHMAP_DATA['champ1_ID'] = champ1_ID
HASHMAP_DATA['champ1_mastery'] = champ1_mastery
HASHMAP_DATA['champ2_ID'] = champ2_ID
HASHMAP_DATA['champ2_mastery'] = champ2_mastery
HASHMAP_DATA['champ3_ID'] = champ3_ID
HASHMAP_DATA['champ3_mastery'] = champ3_mastery
# get match ids 
matchIDs = getMatchIDs(matchIDRequest, puuid, api_key, 10) # Currently get 5 last matches

# get match data
matchesData = {}
for i in range(len(matchIDs)):
    matchesData[i] = getMatchData(matchDataRequest, matchIDs[i], api_key)

#Returns a list of Hashmaps w/ above conditions(ie Champ + KDA + Win/Defeat)
#Note: List is in order of most recent matches
matchStats = getMatchStats()
HASHMAP_DATA['matchStats'] = matchStats

json_data = json.dumps(HASHMAP_DATA) # converts data into json file to send
print(json_data)
sys.stdout.flush()