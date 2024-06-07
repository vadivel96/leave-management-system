var express = require('express');
const { pgClient } = require('../config/dbConfig');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  pgClient.query(`SELECT NOW()`,(err,res)=>{
    if(err){
        console.error('error executing query:',err);
    }
    else{
        console.log('result:',res.rows[0]);
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_NAME);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_PORT);
        console.log(process.env.PUBLIC_KEY)
    }
});
  res.render('index', { title: 'Express' });
});

module.exports = router;
