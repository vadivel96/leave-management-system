require('dotenv').config();
const bcrypt=require('bcrypt');
const round=10;
const jwt=require('jsonwebtoken');
const { callBackjwtVerify } = require('./callBackJwtVerify');
const { generateRandomValueBw0to9 } = require('../utilityFunctions/generateRandomInteger');
const { updateTokenAlgorithm } = require('./updateTokenAlgorithm');
const secret=process.env.JWT_SECRET;
const AccessTokenExpiryTime='10m';
const RefreshTokenExpiryTime='7d'
const algorithms = ['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512', 'ES256', 'ES384', 'ES512', 'EdDSA'];
const payload = {
    sub: "user_id",
    name: "John Doe",
    iat: Math.floor(Date.now() / 1000) // Issued at time
  };
const hashPassword=(password)=>{
    let salt=bcrypt.genSalt(round);
    let hashedPassword=bcrypt.hash(password,salt);
    return hashedPassword;
}

const hashCompare=(password,hashedPassword)=>bcrypt.compare(password,hashedPassword);

const createAccessToken=(payload)=>jwt.sign(payload,process.env.PUBLIC_KEY,{algorithm:process.env.TOKEN_ALGORITHM,expiresIn:AccessTokenExpiryTime});

const createRefreshToken=(payload)=>{
    const randomValue = generateRandomValueBw0to9();
    const selectedAlgorithm = algorithms[randomValue];
    const updatedTokenAlgorithmResult=updateTokenAlgorithm('TOKEN_ALGORITHM',selectedAlgorithm)
    if(updatedTokenAlgorithmResult){
       return jwt.sign(payload,process.env.PRIVATE_KEY,{algorithm:selectedAlgorithm,expiresIn:RefreshTokenExpiryTime})
    }else{
       return `Error in creating Refresh Token ..!!`
    }
};

const verifyToken=(token)=>jwt.verify(token, process.env.PUBLIC_KEY, { algorithms: [process.env.TOKEN_ALGORITHM] } ,callBackjwtVerify);

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
            data.role==='HrManager'
            ? next()
            : res.status(401).send({message:"only HR can Access"})
        }
        else{
            res.status(400).send({message:'token Not found'});
        }
}

module.exports={hashCompare,hashPassword,createToken,verifyToken,decodeToken,validate,roleHR,algorithms}


      