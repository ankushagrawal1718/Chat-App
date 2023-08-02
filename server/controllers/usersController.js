const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req,res,next)=>{
  try{
    const {username,email,password} = req.body;
  console.log(req.body);  
  const usernameCheck = await User.findOne({username}); 
  if(usernameCheck)
    return res.json({msg: "username is already used", status:false});
  const emailCheck = await User.findOne({email});
  if(emailCheck)
    return res.json({msg: "email is already used", status:false});
   const hashedPassword = await bcrypt.hash(password,10);
   const user = await User.create({
    email,
    username,
    password:hashedPassword
   });
   delete user.password;
   return res.json({status:true,user})    
  }
  catch(e){
    next(e);
  }
};

module.exports.login = async (req,res,next)=>{
  try{
    const {username,password} = req.body;
  console.log(req.body);  
  const isUser= await User.findOne({username}); 
  if(!isUser)
  return res.json({msg: "Incorrect username or password", status:false});

  const isPasswordValid = await bcrypt.compare(password,isUser.password);
  if(!isPasswordValid)
  return res.json({msg: "Incorrect password or passwordx", status:false});
  
  delete isUser.password;
   return res.json({status:true,isUser})    
  }
  catch(e){
    next(e);
  }
};