const iconURL = 'http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/';
var summonerName = localStorage["userName"];
var summonerTag = localStorage["userTag"];
var playerIcon = localStorage["iconID"];
// var playerLevel = 150; //Hard Set to Lvl 150 for testing


var summonerIconURL = iconURL + playerIcon + ".png";
summonerName = summonerName[0].toUpperCase() + summonerName.slice(1);

document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + "#"+ summonerTag + "</h2>"; 
document.querySelector('#playerIcon').innerHTML = "<img src = \"" + summonerIconURL + "\">";

// console.log("URL", summonerIconURL);
// document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level:" + playerLevel + "<p>";


// document.querySelector('#playerTag').innerHTML = "<h2> #" + summonerTag + "</h2>";
// document.querySelector('#playerIcon').innerHTML = "<img src = \"" + playerIcon + "\" alt = \"Player Icon's not loading\">";