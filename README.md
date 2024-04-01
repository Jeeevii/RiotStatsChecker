# Welcome to our Riot Stats Checker Project - WP.GG

Hello and welcome to the Riot Stats Checker project, WP.GG for short! This full stack project took me and my friends and about the entirety of our 1-week spring break to finish, but I'm very happy about our progress! Planning on adding more implementations later in the year, and potentially during summer break. 

## Developers 

Jeevi - [Linkedlin](https://www.linkedin.com/in/jeevithan-mahenthran/)
Alex - [Linkedlin](https://www.linkedin.com/in/alexander-lee-855a96236/)
Kevin - [Linkedlin](https://www.linkedin.com/in/hanlin-huang-6aa4131ba/) 

## About the Project

During our break, we set out to create a tool that allows League of Legends players to easily check their in-game statistics. We initially began by developing a Python script to handle all the data fetching. However, we soon realized that our chosen platform, Firebase, didn't support Python. With quick thinking and adaptability, we seamlessly transitioned to using JavaScript for our backend needs.

## How to Use

Our Riot Stats Checker provides a simple interface for users to input their summoner name and view their stats. With just a few clicks, you can access information about your top champions, match history, and more!

## Get Started

This will start the server, and you can access the web application in your browser.

### Check out the website 
Ready to dive in? Check out the project [here](https://wpgg-6f4e2.web.app/index.html) and start exploring your League of Legends statistics today!

### This website is using Riot API's which expire every day
Thus, to actually use this app, contact one of the contributers to this github to refresh the Riot API to use

### Potential Upgrades/Updates to this project
1) Using an actual database(firestore) to store information about users to avoid using localStorage and always refreshing 
and calling user API --> Helps avoid using Riot API too much?
2) Create a User Account system for no apparent reason but it looks cool?(firebase auth)
3) Fix Styling more to look like a better and proper website
4) Get more data(ie. winrates of each champ per patch?)
5) Develop an API that allows developers to use this data of calculated winrates per champ

