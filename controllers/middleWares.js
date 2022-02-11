const jwt = require("jsonwebtoken");

module.exports = {
    isLoggedIn : (req, res, next)=>{
        const token = req.cookies.jwt;
        if(!token){
            res.redirect("/loginPage");
            return;
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                res.redirect("/loginPage");
                return;
            }
            else{
                req.userDetails = decoded.uDetails;
                next();
            }
        })   
    },

    alReadyLoggedIn : (req, res, next)=>{
        const token = req.cookies.jwt;
        if(!token){
            next();
            return;
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                next();
                return;
            }
            else{
                res.redirect("/homepage");
            }
        })   
    },

    isAdmin : (req, res, next)=>{
        if(req.userDetails.isAdmin){
            next();
            return
        }
        res.redirect("/homepage");
    }
}