const mariadb = require('mariadb');
const dbconfigmd = require('../dbconfigmd');
const MariaDB ={
    makeConn : async () => {
        try{
            return await mariadb.createConnection(dbconfigmd);
        }catch (e) {
            console.log(e);
        }
    },
    closeConn : async (conn) => {
        if(conn){
            try{
                await conn.close();
            }catch (e){
                console.log(e);
            }
        }
    }
}

module.exports = MariaDB;