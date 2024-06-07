const dotenv=require('dotenv').config()
const pg=require('pg');
const {Client}=pg;

const pgClient=new Client({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
})


pgClient.connect()
.then(()=>{
    console.log('connected to postgrsql database');
    pgClient.query(`SELECT NOW()`,(err,res)=>{
        if(err){
            console.error('error executing query:',err);
        }
        else{
            console.log('result:',res.rows[0]);

        }
    });
})
.catch((err)=>{
    console.error('Error connecting to postgresql database:', err);

})

module.exports={pgClient};