const dbHelper = require("./dbHelper");
const quesTable = 'questions';
const userTable = 'users';
module.exports = {
    indexpage : (req, res)=>{
        res.render("index", {title:"QuizHero"});
    },
    registerpage : (req, res)=>{
        res.render("registerPage", {title:"Sign-Up | QuizHero"});
    },
    loginpage : (req, res)=>{
        res.render("loginPage", {title:"Login | QuizHero"});
    },
    errorpage : (req, res)=>{
        res.render("errorPage", {title : "404-page not found | QuizHero", layout : 'layouts/errorLayout'});
    },
    homepage : (req, res)=>{
        res.render("homePage", {title:"Home | QuizHero", details:req.userDetails, menu:"Home", layout:"layouts/homePageLayout"});
    },
    questionpage : (req, res)=>{
        let query = `select * from ${quesTable}`;
        dbHelper.execute(query, (err, data)=>{
            if(err){console.log(err);}
            else{
                res.render("questionPage", {title:"Questions | QuizHero", layout:"layouts/homePageLayout", details:req.userDetails, data, menu:"Questions"});
                return;
            }
        })
    },
    userspage : (req, res)=>{
        let query = `select * from ${userTable}`;
        dbHelper.execute(query, (err, data)=>{
            if(err){console.log(err);}
            else{
                res.render("userPage", {title:"Users | QuizHero", layout:"layouts/homePageLayout", details:req.userDetails, data, menu:"Users"});
                return;
            }
        })
    }
}