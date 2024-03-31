# Riot Stats Checker

This is a simple web application for fetching and displaying summoner stats from the Riot Games API.

## Basic Setup for Developers

### Prerequisites
- Node.js installed on your machine
- Express installed
- Pip installed with requests and json

### Installation

#### Install Express
command: npm install express

#### Install Pip
command: pip install requests

Just follow what ever the terminal is asking you to do

### Running the Server
Start the server using the following 
command: node httpserver.js

This will start the server, and you can access the web application in your browser.


### This project is hosted online at:
https://wpgg-6f4e2.web.app/

### This website is using Riot API's which expire every day
Thus, to actually use this app, contact one of the contributers to this github to refresh the Riot API to use

### Potential Upgrades/Updates to this project
1) Using an actual database(firestore) to store information about users to avoid using localStorage and always refreshing 
and calling user API --> Helps avoid using Riot API too much?
2) Create a User Account system for no apparent reason but it looks cool?(firebase auth)
3) Fix Styling more to look like a better and proper website
4) Get more data(ie. winrates of each champ per patch?)
5) Develop an API that allows developers to use this data of calculated winrates per champ

