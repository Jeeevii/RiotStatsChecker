const express = require('express');
const { spawn } = require('child_process');
const { takeCoverage } = require('v8');

const app = express();
const port = 3000;


//FIRE BASE STUFF

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD9a1_63A1U9zbHA3eJozBuMNenypRIoNU",
//   authDomain: "lolstats-4f5cd.firebaseapp.com",
//   projectId: "lolstats-4f5cd",
//   storageBucket: "lolstats-4f5cd.appspot.com",
//   messagingSenderId: "458480348394",
//   appId: "1:458480348394:web:a4b1a4b7a78bfb36dafb93",
//   measurementId: "G-VL486SN4MT"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


//FIRE BASE STUFF ENDED
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
