const express = require('express');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/client-search', (req, res) => {
    // extracting data from script.js
    const summonerName = req.query.summonerName;
    const summonerTag = req.query.summonerTag;

    // passing data to apiserver.py
    console.log("(JavaScript) Sending data to back-end:", summonerName, summonerTag);
    const python_process = spawn('python', ['./back-end/apiserver.py', summonerName, summonerTag]);

    // receiving new data from apiserver.py
    python_process.stdout.on('data', (data) => {
        console.log("(JavaScript) Sending Python data to front-end:");
        console.log(data.toString());
        res.send(data.toString()); // sending new data to front-end
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
