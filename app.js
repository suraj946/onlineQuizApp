const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const pageController = require("./controllers/pageController");
const userController = require("./controllers/userController");
const questionController = require("./controllers/questionController");
const middleWares = require("./controllers/middleWares");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/mainLayout");
app.use(express.static('public'));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/scripts", express.static(__dirname + "public/scripts"));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", middleWares.alReadyLoggedIn, pageController.indexpage);
app.get("/registerpage", middleWares.alReadyLoggedIn, pageController.registerpage);
app.post("/register", userController.register);
app.get("/loginpage", middleWares.alReadyLoggedIn, pageController.loginpage);
app.post("/login", userController.login);
app.get("/homepage", middleWares.isLoggedIn, pageController.homepage);
app.post("/questions", middleWares.isLoggedIn, questionController.sendQuestions);
app.get("/questionspage", middleWares.isLoggedIn, middleWares.isAdmin, pageController.questionpage);
app.get("/userspage", middleWares.isLoggedIn, middleWares.isAdmin, pageController.userspage);
app.post("/addUpdateQuestion", middleWares.isLoggedIn, middleWares.isAdmin, questionController.addUpdateQuestion);
app.delete("/deleteQuestion", middleWares.isLoggedIn, middleWares.isAdmin, questionController.deleteQuestion);
app.put("/updateuserrole", middleWares.isLoggedIn, middleWares.isAdmin, userController.updateUserRole);
app.get("/logout", userController.logout);
app.get("/*", pageController.errorpage);

app.listen(port, ()=>{console.log(`App started on port : ${port}`);})