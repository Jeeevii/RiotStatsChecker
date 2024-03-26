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

    // parsing json data from an object into variables 
    const userName = parsedData.gameName
    const tagLine = parsedData.tagLine
    const iconID = parsedData.iconID
    // solo rank data
    const soloTier = parsedData.soloTier
    const soloRank = parsedData.soloRank
    const soloLP = parsedData.soloLP
    // flex rank data
    const flexTier = parsedData.flexTier
    const flexRank = parsedData.flexRank
    const flexLP = parsedData.flexLP
    // top 1 champ data
    const champ1_ID = parsedData.champ1_ID
    const champ1_mastery = parsedData.champ1_mastery
    // top 2 champ data
    const champ2_ID = parsedData.champ2_ID    
    const champ2_mastery = parsedData.champ2_mastery
    // top 3 champ data
    const champ3_ID = parsedData.champ3_ID
    const champ3_mastery = parsedData.champ3_mastery
    
    console.log("(HTML) parsed data from Python: ", userName, tagLine, iconID, soloTier, soloRank, soloLP, flexTier, flexRank, flexLP, champ1_ID, champ1_mastery, champ2_ID, champ2_mastery, champ3_ID, champ3_mastery);
    document.getElementById('tempOutput').innerText = data; // displaying the returned data on front end

    //Switch page at the end of getting data... 
    // changePage('stats.html',summonerName,summonerTag,data);
});


function changePage(file,playerName,playerTag,data) {
    //TODO: Local Storage is limited, with data --> 
    //https://stackoverflow.com/questions/17502071/transfer-data-from-one-html-file-to-another 
    window.location.href = file; //Change current page to param file(ie. stats.html)
    localStorage["playerName"] = playerName; // Used Local Storage to store playerName and playerTag Details
    localStorage["playerTag"] = playerTag;
};