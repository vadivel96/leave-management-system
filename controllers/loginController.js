const auth=require('../common/auth');
const {pgClient}=require('../config/dbConfig');

const handleLogin=async(req,res,next)=>{
try {
    const employeeDetailsQuery=await pgClient(`
    SELECT * FROM employee_details 
    WHERE employee_details.email=$1`,[req.body.email])

    if(employeeDetailsQuery.rows.length>0){
        const user=employeeDetailsQuery.rows[0]
       const passwordCheck=await auth.hashCompare(req.body.password,user.password);
       if(passwordCheck){
        let token=auth.createToken({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            role:req.body.role
        })
        res.status(200).send({message:"Login Succesfull!",token,userId:user.id})
        return
       }else{
        res.status(400).send(`email or password incorrect..!!`)
        return
       }
    }
    else{
        res.stats(404).send(`employee is not found..!!`);
        return 
    }
    
} catch (error) {
    console.error(`there is an error in login -->${error}`)
    res.staus(500).send(`server side error`)
    return
}
}

