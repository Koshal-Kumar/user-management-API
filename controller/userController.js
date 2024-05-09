const pool =require('../db')

const bcrypt = require('bcrypt');


exports.addUser =  async (req, res) => {
    try{
        const {name, email , phone , password} = req.body;
        const salt=await bcrypt.genSalt(10);
        const value=await bcrypt.hash(password, salt);

        const record= await pool.query("INSERT INTO usermanage (name,email,phone,password) VALUES($1,$2,$3,$4) RETURNING *", [name,email,phone,value]);
        res.status(200).json((await record).rows[0]);
      
        console.log("record updated")
       
    }
    catch(err){
        console.log(err)

    }
}

exports.login = async(req,res) => {
    const {email , password}= req.body;
    const reqRecord =await pool.query("SELECT * FROM usermanage WHERE email=$1" ,[email])
    if(reqRecord.rows.length ===0) {
        return res.json({message : "record doesn't exist"})
    }
    const ismatch = await bcrypt.compare(password,reqRecord.rows[0].password)
    if(!ismatch) {
        return res.json({message : "password does not match"})
    }
    res.json({
        message : "welcome user! you are sucessfully logged in ",
        log : reqRecord.rows[0]
    })
}