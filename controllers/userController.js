const dbHelper = require("./dbHelper");
const table = 'users';
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    register : (req, res)=>{
        let formInfo = req.body;
        let queryForUser = `select username from ${table} where username = '${formInfo.username}'`;
        dbHelper.execute(queryForUser, (err, uname)=>{
            if(err){
                return res.send(err);
            }else{
                if(uname.length && uname[0].username){
                    return res.json(false);
                }else{
                    bcrypt.hash(formInfo.password, 10, (err, hash)=>{
                        if(err){console.log(err);}
                        else{
                            let queryForRegister = `insert into ${table} value(0, '${formInfo.fname}', '${formInfo.lname}', '${formInfo.username}', '${hash}', 0)`;
                            dbHelper.execute(queryForRegister, (err)=>{
                                if(err){
                                    console.log(err);
                                    return;
                                }else{
                                    const userDetails = {};
                                    userDetails.username = formInfo.username;
                                    userDetails.isAdmin = 0;
                                    userDetails.fullName = `${formInfo.fname} ${formInfo.lname}`;
                                    const token = jwt.sign({
                                        uDetails : userDetails
                                    },
                                    process.env.SECRET_KEY,
                                    {expiresIn:'7d'}
                                    );
                                    res.cookie('jwt', token, {httpOnly:true, maxAge: 1000*60*60*24});
                                    return res.json(true);
                                }
                            });
                        }
                    })
                }
            }
        }); 
    },

    login : (req, res)=>{
        let {username, password} = req.body;
        let userCredQuery = `select fname, lname, username, password, isAdmin from ${table} where username = '${username}'`;
        dbHelper.execute(userCredQuery, (err, resultData)=>{
            if(err){
                console.log(err);
            }else{
                if(!(resultData.length)){
                    return res.json("Incorrect username!!!");
                }else{
                    let {fname, lname, ...userDetails} = resultData[0];
                    delete userDetails.password;
                    userDetails.fullName = `${fname} ${lname}`;
                    bcrypt.compare(password, resultData[0].password).then(val=>{
                        if(val){
                            const token = jwt.sign({
                                uDetails : userDetails
                            },
                            process.env.SECRET_KEY,
                            {expiresIn:'7d'}
                            );
                            res.cookie('jwt', token, {httpOnly:true, maxAge: 1000*60*60*24});
                            return res.json("done");
                        }else{
                            return res.json("Incorrect password!!!");
                        }
                    })
                }
            }
        })
    },

    logout : (req, res)=>{
        res.cookie('jwt', "delete", {httpOnly:true, maxAge: 1});
        res.redirect("/");
    },
    updateUserRole : (req, res)=>{
        const { id, role } = req.body;
        const query = `update ${table} set isAdmin=${role} where userId=${id}`;
        dbHelper.execute(query, (err)=>{
            if(err){
                console.log(err);
            }else{
                res.json({
                    operation: role
                });
            }
        })
    }
}