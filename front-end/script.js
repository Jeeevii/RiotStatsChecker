document.getElementById('searchButton').addEventListener('click', async function() {
    const summonerName = document.getElementById('summonerName').value;
    const summonerTag = document.getElementById('summonerTag').value;

    const url = `/client-search?summonerName=${summonerName}&summonerTag=${summonerTag}`; // location of httpserver.js

    console.log("(HTML) Clicked! Sending and Receiving Data Now...");
    const response = await fetch(url); // sending GET request to client.js
    const data = await response.text();
    document.getElementById('tempOutput').innerText = data; // displaying the returned data on front end
    console.log("(HTML) Logging data from JavaScript into website console:");
    console.log(data[1]);
});
