# COMP333Hw3

## The basic introduction of the app

The app is a music rating react app. This app allows 
- Create a new song in a database with title, artist, and rating
- Read a list of songs from the database with title, artist, and rating
- Update title, artist, and rating of an existing song in the database
- Delete a song (title, artist, and rating) from the database

! In Update and create a new song, if the rating is not within the range from 1 to 5, there will be an error message.

! If you add a song that is already added by other users, the user will be alerted and stay at the add song page.

! In registration, you have to enter a password that has at least 10 digits. And you are not allowed to enter the user name that is already taken. If so You will not be allowed to login with the username and password, users would be alert in registration stage. 

! Addsong, update and delete pages all have cancel button.

!!!Extra function: search data based on artist name

## How to run the app
1. open XAMPP and React on your computer.
2. Start MySQL databse and Apache Web Server on XAMPP and create database required using following SQL in Mysql terminal.
``` sql
CREATE DATABASE music_db;
```
 ``` sql
CREATE TABLE users (username VARCHAR(255) PRIMARY KEY, password VARCHAR(255));
```
 ``` sql
CREATE TABLE ratings (id int(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    artist VARCHAR(255),
    song VARCHAR(255),
    rating int(1),
    FOREIGN KEY (username) REFERENCES users(username));
```
3. Copy Controller folder, inc folder and Model folder and index.php to htdocs folder in your XAMPP folder.
4. cd your react app folder and change the src folder to the one on the Github repo. And open React by entering following code in the termianl
``` bash
npm start
```

## MVC architecture and REST api
1. Model: the Model folder(Database.php and UserModel.php) in our Repo contains all model functions for registration, login, add a new song, update rating, delete a song and getting user list and song list. For easier implementation, I combine SongModel and UserModel to one file---UserModel.  While the Database.php is a database access layer class, which allows us to set up a connection to the MySQL database. Apart from the connection setup, it contains generic methods like select and executeStatement that allow us to select records from a database.

2. Controller: The Controller folder(/Api/BaseController.php and /Api/UserController.php) in the Repo contains controllers that hold the majority of our application logic. In UserController.php,this class would contain the action methods that are associated with the REST endpoints that are defined for the user entity. In our case, for example, the /user/list REST endpoint corresponds to the listAction method. In this way, you can also define other methods for other REST endpoints.

3. View: The view is achieved using axios in React front end.(App.js in src folder)

# REST api
```bash
.├── Controller
│   └── Api
│       ├── BaseController.php
│       └── UserController.php
├── inc
│   ├── bootstrap.php
│   └── config.php
├── index.php
└── Model
    ├── Database.php
    └── UserModel.php
```

The REST api has been fully tested through POSTMAN. All functions are working well.

## addtional function: search function 
After the user is logged in, at the top of the page, there is a entry field and a "search" button. The user can enter artist that is shown on the list and get the songs and ratings that are related to the artist entered.

##  js files that are important
1. App.js(main functions) 
2. index.js(render)
3. addSong.js(function component: add new song) 
4. delete.js(function component: delete song) 
5. edit.js(function component: update a song) 
6. searchSong.js(function component: search function) 
7. App.css(styling sheet)

## contribution rate:
Ryan:50% Lance:50%