const iconURL = 'https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon';
var summonerName = localStorage["playerName"];
var summonerTag = localStorage["playerTag"];
var playerIcon = localStorage["iconID"];
// var playerLevel = 150; //Hard Set to Lvl 150 for testing


var summonerIconURL = iconURL + playerIcon + ".jpg?image=q_auto,f_webp,w_auto&v=1710914129937";

document.querySelector('#playerInfo').innerHTML = "<h2>" + summonerName + "#"+ summonerTag + "</h2>"; 
document.querySelector('#playerIcon').innerHTML = "<img src = \"" + summonerIconURL + "\">";

// console.log("URL", summonerIconURL);
// document.querySelector('#playerInfo').innerHTML += "<p id = \"playerLvl\"> Level:" + playerLevel + "<p>";


// document.querySelector('#playerTag').innerHTML = "<h2> #" + summonerTag + "</h2>";
// document.querySelector('#playerIcon').innerHTML = "<img src = \"" + playerIcon + "\" alt = \"Player Icon's not loading\">";