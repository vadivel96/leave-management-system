var express = require('express');
var router = express.Router();

router.post('/',(req,res,next)=>{
    res.status(200).send(`login successful !!`)
    return
});

module.exports=router;