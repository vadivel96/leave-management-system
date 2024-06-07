require('dotenv').config();
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { publicKeyPem } = require('../common/jwtTokenGenerator');
const { verifyToken } = require('../common/auth');

router.get('/',(req,res,next)=>{
    res.status(200).send(`sample Token working !!`)
    return
});

router.get('/tokenExpiryCheck',(req,res,next)=>{
     
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // If Authorization header is missing or not formatted correctly
        res.status(401).send('Unauthorized: Bearer token missing or invalid');
        return;
    }

    // Extract the token from the Authorization header (remove 'Bearer ')
    const token = authHeader.split(' ')[1];
   
    const publicKey = publicKeyPem
    console.log(`public key---------------------->`);
    console.log(publicKey);

    const jwtVerification=verifyToken(token);
      
      console.log(`jwt verification----------->`)
      console.log(jwtVerification);
       
    if(jwtVerification){
        res.status(200).send(`sample Token verified successfully`);
        return
    }else{
        res.status(400).send(`token verification failed..!!`);
        return
    }
   
})

module.exports=router;