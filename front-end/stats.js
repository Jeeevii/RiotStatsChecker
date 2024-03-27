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

var matchStats = localStorage["matchStats"];
matchStats = JSON.parse(matchStats);

console.log(matchStats);
console.log(matchStats[0]); // Gets Basic Stats of most recent match
// console.log(matchStats[0]['kills']);

//Note: matchStats: queueID = Depicts which gameMode:
//QueueIDs: Id = 720 --> Clash, 450 --> ARAM, 440 --> FlexQ, 420 --> SoloQ

// =============================================================================================================================================================
// using parsed data and presenting them in a cooler way
var summonerIconURL = 'https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/' + playerIcon + ".png"; // using datadragon to get icon from iconID
var championIconURL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'; // add champtionID.png

// image and rank data for solo
document.querySelector('#soloTier').textContent = "Ranked Solo " + soloTier + " " + soloRank + " " + soloLP + " LP";
const soloImg = document.createElement('img');
soloImg.src = 'Ranked Emblems/' + soloTier + '.png';
soloImg.style.width = '20%';
soloImg.style.height = '20%'; 
// image and rank data for flex 
document.querySelector('#flexTier').textContent = "Ranked Flex " + flexTier + " " + flexRank + " " + flexLP + " LP";
const flexImg = document.createElement('img');
flexImg.src = 'Ranked Emblems/' + flexTier + '.png';
flexImg.style.width = '20%';
flexImg.style.height = '20%'; 


// ================================================================================================================================================================
// data getting passed to website

// solo tier edge case
if (soloTier == "N/A"){
    soloImg.src = 'Ranked Emblems/UNRANKED.png';
    soloImg.style.width = '40%';
    soloImg.style.height = '40%';   
}
document.querySelector('#soloTier').appendChild(soloImg);
// flex tier edge case
if (flexTier == "N/A"){
    flexImg.src = 'Ranked Emblems/UNRANKED.png';
    flexImg.style.width = '40%';
    flexImg.style.height = '40%';   
}

// document.querySelector('#center-content-sideways').innerHTML = "<h3>" + ;
document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + " #"+ summonerTag + "</h2>"; // player name and tag
document.querySelector('#playerIcon').innerHTML = "<img src = \"" + summonerIconURL + "\">"; // player icon 
document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level: " + summonerLevel + "<p>"; // player level 
document.querySelector('#soloTier').appendChild(soloImg); // uploading solo rank
document.querySelector('#flexTier').appendChild(flexImg); // uploading flex rank 
document.querySelector('#champ1').innerHTML = "<img src='" + championIconURL + champ1_ID + ".png'>"; // top 3 champs icons
document.querySelector('#champ2').innerHTML = "<img src='" + championIconURL + champ2_ID + ".png'>";
document.querySelector('#champ3').innerHTML = "<img src='" + championIconURL + champ3_ID + ".png'>";



// function referenced from gbt to swap between light and dark mode using local storage system
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode'); // store mode in localStorage for user
    localStorage.setItem('darkMode', isDarkMode);
}
const isDarkModeStored = localStorage.getItem('darkMode');
if (isDarkModeStored === 'true') { // if dark mode was stored swap 
    document.body.classList.add('dark-mode');
}
document.getElementById('mode-toggle').addEventListener('click', toggleDarkMode); // reading from button, if clicked call function to toggle dark mode
