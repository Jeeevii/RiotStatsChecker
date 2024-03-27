//account data
var summonerName = localStorage["playerName"];
var summonerTag = localStorage["playerTag"];
var summonerLevel = localStorage["sumLevel"];
var playerIcon = localStorage["iconID"];
var summonerIconURL = 'https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/' + playerIcon + ".png"; // using datadragon to get icon from iconID

//solo rank data
var soloTier = localStorage["soloTier"];
var soloRank = localStorage["soloRank"];
var soloLP = localStorage["soloLP"];

//flex rank data
var flexTier = localStorage["flexTier"];
var flexRank = localStorage["flexRank"];
var flexLP = localStorage["flexLP"];

// data getting passed to website
document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + "#"+ summonerTag + "</h2>"; 
document.querySelector('#playerIcon').innerHTML = "<img src = \"" + summonerIconURL + "\">";
document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level: " + summonerLevel + "<p>";

document.querySelector('#soloTier').textContent = "Ranked Solo " + soloTier + " " + soloRank + " " + soloLP + " LP";
const soloImg = document.createElement('img');
soloImg.src = 'Ranked Emblems/' + soloTier + '.png';
soloImg.style.width = '20%';
soloImg.style.height = '20%'; 
document.querySelector('#soloTier').appendChild(soloImg);

document.querySelector('#flexTier').textContent = "Ranked Flex " + flexTier + " " + flexRank + " " + flexLP + " LP";
const flexImg = document.createElement('img');
flexImg.src = 'Ranked Emblems/' + flexTier + '.png';
flexImg.style.width = '20%';
flexImg.style.height = '20%'; 
document.querySelector('#flexTier').appendChild(flexImg);



// document.querySelector('#playerIcon').innerHTML = "<img src = \"" + playerIcon + "\" alt = \"Player Icon's not loading\">";