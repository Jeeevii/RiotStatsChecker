var summonerName = localStorage["playerName"];
var summonerTag = localStorage["playerTag"];
var summonerLevel = localStorage["sumLevel"];
var playerIcon = localStorage["iconID"];
var matchStats = localStorage["matchStats"];
console.log(matchStats);
console.log(matchStats[0]);
// var playerLevel = 150; //Hard Set to Lvl 150 for testin
var summonerIconURL = 'https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/' + playerIcon + ".png"; // using datadragon to get icon from iconID

// data getting passed to website
document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + "#"+ summonerTag + "</h2>"; 
document.querySelector('#playerIcon').innerHTML = "<img src = \"" + summonerIconURL + "\">";
document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level: " + summonerLevel + "<p>";
// document.querySelector('#playerIcon').innerHTML = "<img src = \"" + playerIcon + "\" alt = \"Player Icon's not loading\">";