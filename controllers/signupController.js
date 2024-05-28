const auth=require('../common/auth');
const {pgClient}=require('../config/dbConfig');

const handleSignup=async(req,res,next)=>{
  try {
    const employeeDetailsQuery=await pgClient(`
    SELECT * FROM employee_details 
    WHERE employee_details.email=$1`,[req.body.email])

    if(employeeDetailsQuery.rows.length>0){
        res.stats(409).send(`employee is already registered..!!`);
        return 
    }
    const hashedPassword=auth.hashPassword(req.body.password)
    const employeeDetailsInsertQuery=await pgClient(`
    INSERT INTO employee_details 
    (first_name,last_name,email,mobile_number,password,role)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [req.body.firsName,
     req.body.lastName,
     req.body.email,
     req.body.mobileNumber,
     hashedPassword,
     req.body.role
    ])

    if(employeeDetailsInsertQuery.rows){
    res.status(200).send(`employee details sent successfully..!!`);
    return
    }else{
    res.status(400).send(`error in inserting the query..!!`)
    return
    }
  } catch (error) {
    console.log(` Error in executing handleSignup -->`,error)
  }

}

module.exports={handleSignup}