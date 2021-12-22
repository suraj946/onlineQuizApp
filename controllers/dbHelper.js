const mysql = require("mysql");
module.exports = {
    getConnection : function(){
        let connection = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'root@123',
            database : 'quiz_hero'
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