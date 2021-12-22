const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const mainController = require("./controllers/mainController");
const userController = require("./controllers/userController");
const app = express();
const port = process.env.PORT || 1300;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/mainLayout");
app.use(express.static('public'));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/scripts", express.static(__dirname + "public/scripts"));

app.use(bodyParser.json({extended:true}));

app.get("/", mainController.homePage);
app.post("/register", userController.register);
app.get("/loginpage", userController.loginpage);

app.listen(port, ()=>{console.log(`App started on port : ${port}`);})