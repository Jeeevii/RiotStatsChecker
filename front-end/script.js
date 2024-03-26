const invalidSummonerMsg = "Summoner not found. Please try again.";
const expiredAPIKey = "API Key is expired.";;
const errorMsg = "An unexpected error occurred.";

document.getElementById('searchButton').addEventListener('click', async function() {
    const summonerName = document.getElementById('summonerName').value;
    const summonerTag = document.getElementById('summonerTag').value;
    if (summonerName.trim() === "" || summonerTag.trim() === "") {
        document.getElementById('tempOutput').innerText = "Please enter a summoner name and tag.";
        return;
    }    

    //Testing that change paging works, should be called at the end of the method
    //changePage('stats.html',summonerName,summonerTag);

    const url = `/client-search?summonerName=${encodeURIComponent(summonerName)}&summonerTag=${encodeURIComponent(summonerTag)}`; // location of httpserver.js
    console.log("(HTML) Clicked! Sending and Receiving Data Now...");
    const response = await fetch(url); // sending GET request to client.js
    const data = await response.text();
    const parsedData = JSON.parse(data); // parses python hashmap into an object (hashmap in js)

    if (parsedData.status === 'Not Found') {
        document.getElementById('tempOutput').innerText = invalidSummonerMsg
        return;
    } 
    else if (parsedData.status === 'Expired') {
        document.getElementById('tempOutput').innerText = expiredAPIKey
        return;
    } 
    else if (parsedData.status === 'Error') {
        document.getElementById('tempOutput').innerText = errorMsg
        return;
    }
    console.log("(HTML) Logging data from JavaScript into website console:");

    // console.log("(HTML) parsed data from Python: ", userName, tagLine, iconID, sumLevel, soloTier, soloRank, soloLP, flexTier, flexRank, flexLP, champ1_ID, champ1_mastery, champ2_ID, champ2_mastery, champ3_ID, champ3_mastery); 
    // document.getElementById('tempOutput').innerText = data; // displaying the returned data on front end

    //Switch page at the end of getting data... 
    changePage('stats.html', parsedData);
});


function changePage(file, parsedData) {
    //TODO: Local Storage is limited, with data --> 
    //https://stackoverflow.com/questions/17502071/transfer-data-from-one-html-file-to-another
    // parsing json data from an object into variables 

    window.location.href = file; //Change current page to param file(ie. stats.html)
    // account data
    localStorage["playerName"] = parsedData.gameName; // Used Local Storage to store playerName and playerTag Details
    localStorage["playerTag"] = parsedData.tagLine;
    localStorage["iconID"] = parsedData.iconID;
    localStorage["sumLevel"] = parsedData.summonerLevel;
    // solo rank data
    localStorage["soloTier"] = parsedData.soloTier;
    localStorage["soloRank"] = parsedData.soloRank;
    localStorage["soloLP"] = parsedData.soloLP;
    // flex rank data
    localStorage["flexTier"] = parsedData.flexTier;
    localStorage["flexRank"] = parsedData.flexRank;
    localStorage["flexLP"] = parsedData.flexLP;
    // top 1 champs and mastery
    localStorage["champ1_ID"] = parsedData.champ1_ID;
    localStorage["champ1_mastery"] = parsedData.champ1_mastery;
    // top 2
    localStorage["champ2_ID"] = parsedData.champ2_ID;
    localStorage["champ2_mastery"] = parsedData.champ2_mastery;
    // top 3
    localStorage["champ3_ID"] = parsedData.champ3_ID;
    localStorage["champ3_mastery"] = parsedData.champ3_mastery;
    localStorage['matchStats'] = parsedData.matchStats;
};