const bcrypt=require('bcrypt');
const round=10;
const jwt=require('jsonwebtoken');
const secret='!@#$$#@#$%&*()(&^%$#$%^&%$%#@##@!@#$%^&*&*(&*^%$';
const expiryTime='10m';

const hashPassword=(password)=>{
    let salt=bcrypt.genSalt(round);
    let hashedPassword=bcrypt.hash(password,salt);
    return hashedPassword;
}

const hashCompare=(password,hashedPassword)=>bcrypt.compare(password,hashedPassword);

const createToken=(payload)=>jwt.sign(payload,secret,{expiresIn:expiryTime});

const decodeToken=(token)=>jwt.decode(token);

const validate=async(req,res,next)=>{
    if(req.headers.authorization)
        {
            let token=req.headers.authorization.split(' ')[1];
            let data=decodeToken(token);
            req.storedDecodedToken=data;
            console.log('data--------------------->',data);
            (Math.round(Date.now/1000) <= data.exp)
            ? next()
            : res.status(401).send({message:'token expired'})
        }
        else{
            res.status(400).send({message:'token Not found'});
        }
}

const roleHR=(req,res,next)=>{
    if(req.storedDecodedToken)
        {
            let data=req.storedDecodedToken;
            data.role==='HR'
            ? next()
            : res.status(401).send({message:"only HR can Access"})
        }
        else{
            res.status(400).send({message:'token Not found'});
        }
}

module.exports={hashCompare,hashPassword,createToken,decodeToken,validate,roleHR}