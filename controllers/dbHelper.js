const mysql = require("mysql");
require("dotenv").config();
module.exports = {
    getConnection : function(){
        let connection = mysql.createConnection({
            host : process.env.HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
        });
        connection.connect();
        return connection;
    },
    execute : function(queryString, callback){
        let connection = this.getConnection();
        connection.query(queryString, callback);
        connection.end();
    }
}