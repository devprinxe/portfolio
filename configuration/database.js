import mysql from "mysql";

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog"
});

conn.connect((err)=>{
    if(err) throw err;
    console.log("Database Conection Sccessful");
});

export {conn};