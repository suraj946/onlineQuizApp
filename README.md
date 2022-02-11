# onlineQuizApp

Create a mysql database 
-Query :-  create database quiz_hero;

Use that database
-Query :-  use quiz_hero;

Create table (users)
-Query :-  create table users(userId int auto_increment primary key, fname varchar(255), lname varchar(255), username varchar(255), password varchar(255), isAdmin int);

Create table (questions)
-Query :-  create table questions(questionId int auto_increment primary key, questions varchar(255), options varchar(255), answer varchar(255));

Now install all dependencies
-Run :- npm install

Start server
-Run :- npm start

Open browser 
url :- http://localhost:1300

- Create an account in register section
- After creating an account go to terminal and update users table set isAdmin = 1
-Query :- update users set isAdmin=1 where userId=1;   (or your userId)
