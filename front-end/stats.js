var summonerName = localStorage["playerName"];
var summonerTag = localStorage["playerTag"];
var playerIcon;
var playerLevel = 150; //Hard Set to Lvl 150 for testing

summonerName = summonerName[0].toUpperCase() + summonerName.slice(1);

document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + "#"+ summonerTag + "</h2>"; 

// document.querySelector('#playerTag').innerHTML = "<h2> #" + summonerTag + "</h2>";
document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level:" + playerLevel + "<p>";
// document.querySelector('#playerIcon').innerHTML = "<img src = \"" + playerIcon + "\" alt = \"Player Icon's not loading\">";