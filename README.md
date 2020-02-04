JustBuy
E-commerce App that allows users to explore,create and add merchandise to cart.
<p align="center"><img width=75% src="https://github.com/aibek1392/JustBuy_frontend/blob/master/src/images/Screen%20Shot%202020-01-31%20at%207.16.31%20PM.png?raw=true"></p>
<p align="center"><img width=75% src="https://github.com/aibek1392/JustBuy_frontend/blob/master/src/images/Screen%20Shot%202020-01-31%20at%207.18.06%20PM.png?raw=true"></p>
<p align="center"><img width=75% src="https://github.com/aibek1392/JustBuy_frontend/blob/master/src/images/Screen%20Shot%202020-01-31%20at%207.18.47%20PM.png?raw=true"></p>
<p align="center"><img width=75% src="https://github.com/aibek1392/JustBuy_frontend/blob/master/src/images/Screen%20Shot%202020-01-31%20at%207.19.01%20PM.png?raw=true"></p>


<p align="center">
  <img align="center" src="https://img.shields.io/badge/CSS-3.0-1572B6">
 <img align="center" src="https://img.shields.io/badge/HTML-5.2-E34F26">
 <img align="center" src="https://img.shields.io/badge/Javascript-1.8.5-F7DF1E">
 <img align="center" src="https://img.shields.io/badge/Postgresql-12.1-336791">
 <img align="center" src="https://img.shields.io/badge/React.JS-16.12.0-61DAFB">
 <img align="center" src="https://img.shields.io/badge/Ruby-2.6.5-CC342D">
 <img align="center" src="https://img.shields.io/badge/Ruby%20On%20Rails-6.0.2.1-cc0600">
</p>
Features
Provides just one step to see items on the list. Items can be filtered by category as needed, and searched by name.  Enabled authentication (via JWT, local storage) for user registration and login. User simply can create, add to his cart and remove it from the cart.

Built with

Backend:
Ruby [2.6.1] Rails [> 5.2.3] - MVC web framework used as an API PostgreSQL [>= 0.18, < 2.0] - Database bcrypt [> 3.1.7] - Gem for encryption and securing user passwords Figaro - Rails gem for securing API Keys Active Model Serializers - Serializing API routes to JSON JWT - App deployment

FrontEnd:
React.js React Router 

Styling: CSS Semantic framework and Custom CSS
Prerequisites
Before you begin, ensure you have installed the latest version of:
Ruby Rails PostgreSQL Node.js and npm
API Reference

This web app uses the following APIs:

Frontend Installation:

Clone this repo to your local machine git clone cd to frontend directory Ensure your Backend API is running at http://localhost:3001/ run npm install to install all dependencies run npm start to start server When prompted, ensure Frontend is running at http://localhost:3000, Make sure run rails db:create, rails db:migrate and create env file and save your token in there.

https://thawing-fjord-07952.herokuapp.com/