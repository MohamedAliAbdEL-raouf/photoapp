
const userModel = require('../models/user/user.models');

module.exports.signUp = async (req,res)=>{
    const {name,email,password,age} = req.body;
    await userModel.insertMany({name,email,password,age});
    res.json({message:"success"})
}; 

