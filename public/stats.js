// parsing data from local storage 
//account data
var summonerName = localStorage["playerName"];
var summonerTag = localStorage["playerTag"];
var summonerLevel = localStorage["sumLevel"];
var playerIcon = localStorage["iconID"];
//solo rank data
var soloTier = localStorage["soloTier"];
var soloRank = localStorage["soloRank"];
var soloLP = localStorage["soloLP"];
//flex rank data
var flexTier = localStorage["flexTier"];
var flexRank = localStorage["flexRank"];
var flexLP = localStorage["flexLP"];
// top 3 most played champions data 
var champ1_ID = localStorage["champ1_ID"]
var champ2_ID = localStorage["champ2_ID"]
var champ3_ID = localStorage["champ3_ID"]
// top 3 most played champions mastery
var champ1_mastery = localStorage["champ1_mastery"];
var champ2_mastery = localStorage["champ2_mastery"];
var champ3_mastery = localStorage["champ3_mastery"];
// match data
var matchStats = localStorage["matchStats"];
matchStats = JSON.parse(matchStats);

console.log(matchStats);
//console.log(matchStats[0]); // Gets Basic Stats of most recent match
// console.log(matchStats[0]['kills']);

//Note: matchStats: queueID = Depicts which gameMode:
//QueueIDs: Id = 720 --> Clash, 450 --> ARAM, 440 --> FlexQ, 420 --> SoloQ

// =============================================================================================================================================================
// using parsed data and presenting them in a cooler way
var summonerIconURL = 'https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/' + playerIcon + ".png"; // using datadragon to get icon from iconID
var championIconURL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'; // add champtionID.png
// hashmap with QueueIDs: Id = 720 --> Clash, 450 --> ARAM, 440 --> Ranked Flex, 420 --> Ranked Solo
const gameModes = {
    720: 'ARAM Clash',
    700: 'Clash',
    450: 'ARAM',
    440: 'Ranked Flex',
    420: 'Ranked Solo',
    1020: 'One For All',
    0: 'Custom Game',
    490: 'Normals',
    400: 'Draft Pick'
};

const nonFun = [700, 440, 420, 490, 400];
// Populate match history data
const matchHistoryDiv = document.querySelector('.match-history-container');

// Loop through all matches in matchStats array and create HTML elements for each match
matchStats.forEach((match, index) => {
    var championImgNameURL = 'https://opgg-static.akamaized.net/meta/images/lol/14.6.1/champion/' + match.champion + '.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160,h_160&v=1710914129937'
    let matchDiv = document.createElement('div');
    matchDiv.classList.add('match-entry');
    matchDiv.style.display = 'flex';
    matchDiv.style.justifyContent = 'space-between';
    matchDiv.style.alignItems = 'center';
    if (!nonFun.includes(match.queueId)) {
        match.lane = 'NONE';
    }
    // matchDiv.style
    // Determine the game mode from QueueID
    const gameMode = gameModes[match.queueId] || 'Unknown';
    // Construct HTML content for each match
    matchDiv.innerHTML = `
    <img src="${championImgNameURL}" style="width: 8%; height: 8%;">
    <h3>${gameMode}</h3>
    <h3>${match.kills} / ${match.deaths} / ${match.assists}</h3>
    <h3>${match.lane}</h3>
    <h3>${match.win ? 'Victory' : 'Defeat'}</h3>
    `;
    matchHistoryDiv.appendChild(matchDiv);
});


// ================================================================================================================================================================
// data getting passed to website

// adjusting profile icon size to match all available
const iconImg = document.createElement('img');
iconImg.src = summonerIconURL;
iconImg.style.width = '60%';
iconImg.style.height = '60%'; 
iconImg.style.borderRadius = '50%'; 
iconImg.classList = 'iconImg'
document.querySelector('#playerIcon').appendChild(iconImg); // uploading profile icon

// solo tier edge case
const soloImg = document.createElement('img');
if (soloTier == "N/A"){
    soloImg.src = 'Ranked Emblems/UNRANKED.png';
    soloImg.style.width = '100%';
    soloImg.style.height = '100%';   
} else {
    soloImg.src = 'Ranked Emblems/' + soloTier + '.png';
    soloImg.style.width = '60%';
    soloImg.style.height = '60%'; 
}
// flex tier edge case
const flexImg = document.createElement('img');
if (flexTier == "N/A"){
    flexImg.src = 'Ranked Emblems/UNRANKED.png';
    flexImg.style.width = '100%';
    flexImg.style.height = '100%';   
} else {
    flexImg.src = 'Ranked Emblems/' + flexTier + '.png';
    flexImg.style.width = '60%';
    flexImg.style.height = '60%'; 
}

// document.querySelector('#center-content-sideways').innerHTML = "<h3>" + ;
document.querySelector('#playerName').innerHTML = "<h1>" + summonerName + " #"+ summonerTag + "</h1>"; // player name and tag
document.querySelector('#playerLevel').innerHTML += "<h3 id = \"playerLvl\"> Level: " + summonerLevel + "</h3>"; // player level 
// rank image with rank data side by side
document.querySelector('#soloRank').innerHTML = "<h3> Ranked Solo " + soloTier + " " + soloRank + " " + soloLP + " LP </h3>"; // image and rank data for solo
document.querySelector('#flexRank').innerHTML = "<h3> Ranked Flex " + flexTier + " " + flexRank + " " + flexLP + " LP </h3>"; // image and rank data for flex 
document.querySelector('#soloTier').appendChild(soloImg); // uploading solo rank
document.querySelector('#flexTier').appendChild(flexImg); // uploading flex rank 
// top 3 champs with masteries under, side by side
document.querySelector('#champ1-img').innerHTML = "<img src='" + championIconURL + champ1_ID + ".png' style = 'max-width: 100%'>"; // top 3 champs icons
document.querySelector('#champ2-img').innerHTML = "<img src='" + championIconURL + champ2_ID + ".png' style = 'max-width: 100%'>";
document.querySelector('#champ3-img').innerHTML = "<img src='" + championIconURL + champ3_ID + ".png' style = 'max-width: 100%'>";
// document.querySelector('#champ1-img').innerHTML = "<img src='" + championIconURL + champ1_ID + ".png'>"; // top 3 champs icons
// document.querySelector('#champ2-img').innerHTML = "<img src='" + championIconURL + champ2_ID + ".png'>";
// document.querySelector('#champ3-img').innerHTML = "<img src='" + championIconURL + champ3_ID + ".png'>";
document.querySelector('#champ1-mastery').innerHTML = "<h2>" + champ1_mastery +  "</h2>"; // top 3 champs mastery data
document.querySelector('#champ2-mastery').innerHTML = "<h2>" + champ2_mastery +  "</h2>"; 
document.querySelector('#champ3-mastery').innerHTML = "<h2>" + champ3_mastery +  "</h2>"; 
// document.querySelector('#champ1-data').style.width = '30%';
// document.querySelector('#champ2-data').style.width = '30%';
// document.querySelector('#champ3-data').style.width = '30%';

console.log('Date: ' + Date.now());

// function referenced from gbt to swap between light and dark mode using local storage system
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode'); // store mode in localStorage for user

    localStorage.setItem('darkMode', isDarkMode);
    localStorage.setItem('darkMode', isDarkContainer);
}  
const isDarkModeStored = localStorage.getItem('darkMode');

if (isDarkModeStored === 'true') { // if dark mode was stored swap 
    document.body.classList.add('dark-mode');

}
document.getElementById('mode-toggle').addEventListener('click', toggleDarkMode); // reading from button, if clicked call function to toggle dark mode