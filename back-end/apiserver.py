import sys
import requests
import json

summoner, tag = sys.argv[1], sys.argv[2]
api_key = 'RGAPI-a7fd8aac-f961-42f1-b24a-af73ff7afa0b'
accountRequest = 'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + summoner + '/' + tag + '?api_key=' + api_key
summonerRequest = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/'

# getting summoner puuid from summoner name and tag
accountData = requests.get(accountRequest)
playerInfo = accountData.json()
puuid = playerInfo['puuid']
print("puuid: " + puuid)

# function to get icon from that puuid
def getPlayerIcon(request, puuid):
    new_request = request + puuid + '?api_key=' + api_key
    return requests.get(new_request)

iconRequest = getPlayerIcon(summonerRequest, puuid)
summonerData = iconRequest.json()
iconID = summonerData['profileIconId'] 
print("iconID: " + str(iconID))

sys.stdout.flush()
