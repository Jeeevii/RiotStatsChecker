var summonerName = localStorage["playerName"];
var summonerTag = localStorage["playerTag"];
var iconID = localStorage["iconID"];
const iconURL = 'https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/' + iconID + '.png'; // using op.gg's server-side icon for the profile
// var playerLevel = 150; //Hard Set to Lvl 150 for testing
var summonerIconURL = iconURL;

document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + "#"+ summonerTag + "</h2>"; 
document.querySelector('#playerIcon').innerHTML = "<img src = \"" + summonerIconURL + "\">";

// console.log("URL", summonerIconURL);
// document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level:" + playerLevel + "<p>";
// document.querySelector('#playerTag').innerHTML = "<h2> #" + summonerTag + "</h2>";
// document.querySelector('#playerIcon').innerHTML = "<img src = \"" + playerIcon + "\" alt = \"Player Icon's not loading\">";