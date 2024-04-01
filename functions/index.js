// const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const cors = require('cors');
const express = require('express');
const { spawn } = require('child_process');
const { takeCoverage } = require('v8');
const app = express();
const port = 3000;
const numMatchesToTrack = 10;
//Riot API Constants
const api_key = 'RGAPI-c1af8532-b49a-47d4-8d3e-c99c3ed74172';

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: true}));

app.get('/client-search', async (req, res) => {
    const summonerName = req.query.summonerName;
    const summonerTag = req.query.summonerTag;
    try{
        let output = {};
        //Get Player Data
        let puuidData = await getPuuid(summonerName,summonerTag);
        let puuid = puuidData['puuid'];
        let summonerData = await getSummoner(puuid);
        let masteryData = await getMasteryPts(puuid);
        const summonerID = summonerData['id'];
        let rankData = await getRank(summonerID);
        let matchIds = await getMatchIds(puuid, numMatchesToTrack); //List of matchIds
        let matchData = await getMatchStatsFromAPI(matchIds);
        let convertedMatchStats = await filterMatchStats(puuid, matchData);        
        let rankDetails = getRanks(rankData);
        //Format into output JSON
        
        output['gameName'] = puuidData['gameName'];
        output['tagLine'] = puuidData['tagLine'];
        output['iconID'] = summonerData['profileIconId'];
        output['summonerLevel'] = summonerData['summonerLevel'];
        output['champ1_ID'] = masteryData[0]['championId'];
        output['champ1_mastery'] = masteryData[0]['championPoints'];
        output['champ2_ID'] = masteryData[1]['championId'];
        output['champ2_mastery'] = masteryData[1]['championPoints'];
        output['champ3_ID'] = masteryData[2]['championId'];
        output['champ3_mastery'] = masteryData[2]['championPoints'];
        output['matchStats'] = convertedMatchStats;
    
        output['soloTier'] = rankDetails['soloTier'];
        output['soloRank'] = rankDetails['soloRank'];
        output['soloLP'] = rankDetails['soloLP'];
        output['flexTier'] = rankDetails['flexTier'];
        output['flexRank'] = rankDetails['flexRank'];
        output['flexLP'] = rankDetails['flexLP'];
        //SEND TO Client Side Code(AKA scripts.js)
        output = JSON.stringify(output);
        res.status(200).send(output);
    }
    catch(error){
        logger.error('Failed Fetching Data! Error msg: ' + error);
        res.status(500).send("Server " + error);
    }
});
exports.app = functions.https.onRequest(app);

async function getPuuid(sName, sTag){
    const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${sName}/${sTag}?api_key=${api_key}`);
    if(!response.ok){
        handleStatusCodes(response.status);
    }
    let output = await response.json();
    return output;
}

async function getSummoner(puuid){
    const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`);
    if(!response.ok){
        handleStatusCodes(response.status);
    }
    let output = await response.json();
    return output;
}

async function getMasteryPts(puuid){
    const response = await fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${api_key}`);
    if(!response.ok){
        handleStatusCodes(response.status);
    }
    let output = await response.json();
    return output;
}

async function getRank(summonerID){
    const response = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${api_key}`);
    if(!response.ok){
        handleStatusCodes(response.status);
    }
    let output = await response.json();
    return output;
}

async function getMatchIds(puuid, numMatches){
    const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids/?start=0&count=${numMatches}&api_key=${api_key}`);
    if(!response.ok){
        handleStatusCodes(response.status);
    }
    let output = await response.json();
    return output;
}

async function getMatchData(matchID){
    const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${api_key}`);
    if(!response.ok){
        handleStatusCodes(response.status);
    }
    let output = await response.json();
    return output;
}

async function getMatchStatsFromAPI(matchIDs){
    let matchStats = [];
    for(let i = 0; i < numMatchesToTrack; i++){
        matchStats[i] = await getMatchData(matchIDs[i]);
        // console.log(matchIDs[i]);
        // console.log(matchStats[i]);
    }
    return matchStats;
}

function filterMatchStats(puuid, data){
    lst = [];
    for(let i = 0; i < numMatchesToTrack; i++){
        matchStats = {};
        // Get Index of Participant
        index = data[i]['metadata']['participants'].indexOf(puuid);
        //Gets data of champ, KDA, win/lose
        matchStats['champion'] =  data[i]['info']['participants'][index]['championName'];
        matchStats['kills'] = data[i]['info']['participants'][index]['kills'];
        matchStats['deaths'] =  data[i]['info']['participants'][index]['deaths'];
        matchStats['assists'] =  data[i]['info']['participants'][index]['assists'];
        matchStats['lane'] = data[i]['info']['participants'][index]['lane'];
        //currMatchData['role'] = matchesData[i]['info']['participants'][index]['role']
        matchStats['win'] = data[i]['info']['participants'][index]['win'];
        //currMatchData['queueType'] =  matchesData[i]['info']['gameType']
        matchStats['gameMode'] =  data[i]['info']['gameMode'];
        //matchStats['gameName'] =  matchesData[i]['info']['gameName']
        matchStats['queueId'] =  data[i]['info']['queueId'];
        lst[i] = matchStats;
    }
    return lst;
}

function getRanks(data){
    let output = {
        soloTier: 'N/A',
        soloRank: 'N/A',
        soloLP: 'N/A',
        flexTier: 'N/A',
        flexRank: 'N/A',
        flexLP: 'N/A'
    };
    for(let i = 0; i < data.length;i++){
        if(data[i]['queueType'] == 'RANKED_SOLO_5x5'){
        //solo data 
        output['soloTier'] = data[i]['tier'];
        output['soloRank'] = data[i]['rank'];
        output['soloLP'] = data[i]['leaguePoints'];
        }
    else{
        //flex data
        output['flexTier'] = data[i]['tier'];
        output['flexRank'] = data[i]['rank'];
        output['flexLP'] = data[i]['leaguePoints'];
        }
    }
    return output;
}

function handleStatusCodes(status){
    if(status == 404 || status == 400){
        throw Error('Invalid RiotID + Tag');
    }
    else if(status == 429){
        // setTimeout(120000); // 2 minute timeout
        throw Error('Server is busy, try again later.');
    }
    else if(status == 401 || status == 403){
        throw Error('Unexpected Error');
    }
    return; 
}