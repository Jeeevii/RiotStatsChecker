const invalidSummonerMsg = "Summoner not found. Please try again.";
const expiredAPIKey = "API Key is expired.";;
const errorMsg = "An unexpected error occurred. Please try again.";
const emptyMsg = "Please enter a summoner name and tag."
const waitingMsg = "Data is loading, please wait...";
const localBaseURL =  'http://127.0.0.1:5001/wpgg-6f4e2/us-central1/app';
const publicBaseURL = 'https://us-central1-wpgg-6f4e2.cloudfunctions.net/app';

document.getElementById('searchButton').addEventListener('click', async function() {
    const summonerName = document.getElementById('summonerName').value;
    const summonerTag = document.getElementById('summonerTag').value;
    if (summonerName.trim() === "" || summonerTag.trim() === "") {
        document.getElementById('tempOutput').innerText = "Please enter a summoner name and tag.";
        return;
    }    

    //Testing that change paging works, should be called at the end of the method
    //changePage('stats.html',summonerName,summonerTag);
    document.getElementById('tempOutput').innerText = waitingMsg // printing, loading data to client while data is getting sent and received

    const url = `/client-search?summonerName=${encodeURIComponent(summonerName)}&summonerTag=${encodeURIComponent(summonerTag)}`; // location of httpserver.js
    console.log("(HTML) Clicked! Sending and Receiving Data Now...");
    const response = await fetch(localBaseURL+url);

        // {
        //     method: 'POST'
        //     headers: {
        //         "Content-type": "application/json"
        //     },
        //     body: 
        // }); // sending GET request to client.js
    const data = await response.text();
    console.log(data);
    // const parsedData = JSON.parse(data); // parses python hashmap into an object (hashmap in js)

    // if (parsedData.status === 'Not Found') {
    //     document.getElementById('tempOutput').innerText = invalidSummonerMsg
    //     return;
    // } 
    // else if (parsedData.status === 'Expired') {
    //     document.getElementById('tempOutput').innerText = expiredAPIKey
    //     return;
    // } 
    // else if (parsedData.status === 'Error') {
    //     document.getElementById('tempOutput').innerText = errorMsg
    //     return;
    // }
    // console.log("(HTML) Logging data from JavaScript into website console:");

    // // console.log("(HTML) parsed data from Python: ", userName, tagLine, iconID, sumLevel, soloTier, soloRank, soloLP, flexTier, flexRank, flexLP, champ1_ID, champ1_mastery, champ2_ID, champ2_mastery, champ3_ID, champ3_mastery); 
    // // document.getElementById('tempOutput').innerText = data; // displaying the returned data on front end

    // //Switch page at the end of getting data... 
    // changePage('stats.html', parsedData);
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
    
    stats = JSON.stringify(parsedData.matchStats);
    localStorage['matchStats'] = stats;
};

// function referenced from gbt to swap between light and dark mode using local storage system
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode'); // store mode in localStorage for user
    localStorage.setItem('darkMode', isDarkMode);
}
const isDarkModeStored = localStorage.getItem('darkMode');
if (isDarkModeStored === 'true') { // if dark mode was stored swap 
    document.body.classList.add('dark-mode');
}
document.getElementById('mode-toggle').addEventListener('click', toggleDarkMode); // reading from button, if clicked call function to toggle dark mode

async function getData(){

}

async function postData(){

}