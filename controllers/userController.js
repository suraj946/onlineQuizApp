const dbHelper = require("./dbHelper");
const table = 'users';

module.exports = {
    register : (req, res)=>{
        let formInfo = req.body;
        let queryForUser = `select username from ${table} where username = '${formInfo.username}'`;
        let queryForRegister = `insert into ${table} value(0, '${formInfo.fname}', '${formInfo.lname}', '${formInfo.username}', '${formInfo.password}', 0)`;
        dbHelper.execute(queryForUser, (err, uname)=>{
            if(err){
                return res.send(err);
            }else{
                if(uname.length && uname[0].username){
                    return res.json(false);
                }else{
                    dbHelper.execute(queryForRegister, (err)=>{
                        if(err){
                            return res.send(err);
                        }else{
                            return res.json(true);
                        }
                    });
                }
            }
        });
        
    },
    loginpage : (req, res)=>{
        res.send("on login page");
    }
}