var summonerName = localStorage["playerName"];
var summonerTag = localStorage["playerTag"];
var summonerLevel = localStorage["sumLevel"];
var playerIcon = localStorage["iconID"];
var matchStats = localStorage["matchStats"];
matchStats = JSON.parse(matchStats);

console.log(matchStats);
console.log(matchStats[0]); // Gets Basic Stats of most recent match
console.log(matchStats[0]['kills']);
var summonerIconURL = 'https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/' + playerIcon + ".png"; // using datadragon to get icon from iconID

// data getting passed to website
document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + "#"+ summonerTag + "</h2>"; 
document.querySelector('#playerIcon').innerHTML = "<img src = \"" + summonerIconURL + "\">";
document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level: " + summonerLevel + "<p>";
// document.querySelector('#playerIcon').innerHTML = "<img src = \"" + playerIcon + "\" alt = \"Player Icon's not loading\">";