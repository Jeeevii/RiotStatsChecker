// const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require('express');
const { spawn } = require('child_process');
const { takeCoverage } = require('v8');
const app = express();
const port = 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req,res) =>{
//     res.status(200).send("<h1>test</h1>");
// });
app.get('/client-search', async (req, res) => {
    // receiving data from script.js
    const summonerName = req.query.summonerName;
    const summonerTag = req.query.summonerTag;
    console.log(summonerName, summonerTag);
    let data = await getPuuid(summonerName,summonerTag);
    console.log("server side funct running");
    console.log(data);
    console.log(data['puuid']);
    res.status(200).send(data['puuid'].toString());
    
    //python code: --> Doesn't work with firebase hosting 
    // const summonerName = req.query.summonerName;
    // const summonerTag = req.query.summonerTag;
    // // sending data to apiserver.py
    // console.log("(JavaScript) Sending data to back-end:");
    // console.log(summonerName, summonerTag);
    // const python_process = spawn('python', ['apiserver.py', summonerName, summonerTag]);
    // // receiving new data from apiserver.py
    // console.log("test");
    // python_process.stdout.on('data', (data) => {
    //     console.log("(JavaScript) Sending Python data to front-end:");
    //     console.log(data.toString());
    //     res.send(data.toString()); // sending the new data back to front-end
    // });
});
 
async function getPuuid(sName, sTag){
    const data = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${sName}/${sTag}?api_key=RGAPI-a20a9e41-4a88-448b-ab94-20aef94eabac`);
    console.log("GetPuuid funct running!");
    // console.log(data['puuid']);
    // console.log(data);
    let out = await data.json()
    console.log(out);
    return out;
}
// app.post('/client-search', (req,res) =>{
//     const riotNameAndTag = req.body;
//     if(!riotNameAndTag){
//         return res.status(400).send({status: failed})
//     }
//     res.status(200).send()
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

exports.app = functions.https.onRequest(app);