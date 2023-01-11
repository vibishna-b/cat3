const mysql=require('mysql')
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"infosys",
});
con.connect((err)=>{
    if(err) throw err;
    console.log("connection created..!!");
});

module.exports.con = con;