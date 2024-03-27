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


// =============================================================================================================================================================
// using parsed data and presenting them in a cooler way
var summonerIconURL = 'https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/' + playerIcon + ".png"; // using datadragon to get icon from iconID

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


// =============================================================================================================================
// data getting passed to website
document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + " #"+ summonerTag + "</h2>"; // player name and tag
document.querySelector('#playerIcon').innerHTML = "<img src = \"" + summonerIconURL + "\">"; // player icon 
document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level: " + summonerLevel + "<p>"; // player level 

// solo tier
if (soloTier == "N/A"){
    soloImg.src = 'Ranked Emblems/UNRANKED.png';
    soloImg.style.width = '40%';
    soloImg.style.height = '40%';   
}
document.querySelector('#soloTier').appendChild(soloImg);
// flex tier 
if (flexTier == "N/A"){
    flexImg.src = 'Ranked Emblems/UNRANKED.png';
    flexImg.style.width = '40%';
    flexImg.style.height = '40%';   
}
document.querySelector('#flexTier').appendChild(flexImg);



// document.querySelector('#playerIcon').innerHTML = "<img src = \"" + playerIcon + "\" alt = \"Player Icon's not loading\">";