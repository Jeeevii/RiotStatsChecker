const express = require('express');
const { spawn } = require('child_process');
const { takeCoverage } = require('v8');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWW-EWEa9vZDfoFzDWKyLDL2Zi9eeHSYA",
  authDomain: "wpgg-6f4e2.firebaseapp.com",
  projectId: "wpgg-6f4e2",
  storageBucket: "wpgg-6f4e2.appspot.com",
  messagingSenderId: "939610303109",
  appId: "1:939610303109:web:8c220462037799e8a857ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const app = express();
const express = express();
const port = 3000;

app.use(express.static('front-end'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/client-search', (req, res) => {
    // receiving data from script.js
    const summonerName = req.query.summonerName;
    const summonerTag = req.query.summonerTag;
    // sending data to apiserver.py
    console.log("(JavaScript) Sending data to back-end:");
    console.log(summonerName, summonerTag);
    const python_process = spawn('python', ['./back-end/apiserver.py', summonerName, summonerTag]);
    // receiving new data from apiserver.py
    python_process.stdout.on('data', (data) => {
        console.log("(JavaScript) Sending Python data to front-end:");
        console.log(data.toString());
        res.send(data.toString()); // sending the new data back to front-end
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
