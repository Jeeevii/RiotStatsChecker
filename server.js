const express = require('express');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/run-script', (req, res) => {
    const data_to_pass_in = "Summoner Name";
    //const java = "(JavaScript) data coming from server.js";

    const python_process = spawn('python', ['./back-end/server.py', data_to_pass_in]);
    console.log("(JavaScript) Sending data to python script!");
    python_process.stdout.on('data', (data) => {
        console.log("(JavaScript) Sending new data from python to HTML!");
        //console.log(data.toString());
        //res.send(java.toString());
        res.send(data.toString());
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
