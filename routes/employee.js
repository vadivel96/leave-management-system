var express = require('express');
const { pgClient } = require('../config/dbConfig');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const allEmployeelist=pgClient.query(`SELECT * FROM employee WHERE `)
  res.send('respond with a resource');
});

module.exports = router;
