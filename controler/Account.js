const { OAuth2Client } = require("google-auth-library");
const Accountservice=require("../service/Account")
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt=require("jsonwebtoken");

const AccountLogin=async(req,res)=>{
  try {
    const data=req.body
    const isready=await Accountservice.EmailLogin(data)
    if(isready?.code===23||isready?.code===40||isready?.code===30) return res.status(400).json({message:isready.message});
    if(isready?.user){
      const token=jwt.sign({id:isready.user._id,role:isready.user.role},process.env.JWT_SECRET_CODE, { expiresIn: "7d" })
      res.cookie("token", token, {
         httpOnly: true,
         secure: true, // true in production (HTTPS)
         sameSite: "none",
        //  domain: ".learnezily.app",
         maxAge: 7 * 24 * 60 * 60 * 1000
      })
      res.status(200).json({code:20, data:isready?.user})
    }
    res.status(400).json({message:"server error"})
  } catch (error) {
    
  }
}

const AccountRegister=async(req,res)=>{
  try {
    const data = req.body;
    const isready=await Accountservice.EmailAccount(data)
    if (!isready) res.status(400).json({ message: "User exists" });
    res.status(200).json({ code:20,message: "OTP sent to email" });
  } catch (error) {
    
  }
}

const AccountGoogle=async(req,res)=>{
    try {
        const { token } = req.body;
    const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
    const payload = ticket.getPayload();
    const data={
    email:payload.email,
    sub:payload.sub,
    }
    const AS=await Accountservice.GoogleAccount(data)
     const stoken=jwt.sign({id:AS.user._id,role:AS.user.role},process.env.JWT_SECRET_CODE, { expiresIn: "7d" })
      res.cookie("token", stoken, {
         httpOnly: true,
         secure: false, // true in production (HTTPS)
         sameSite: "none",
        //  domain: ".learnezily.app",
         maxAge: 7 * 24 * 60 * 60 * 1000
      })
      res.status(200).json({ data:AS?.user})
    } catch (error) {
        res.json({messgae:"error"})
    }
}

const AccountVerify=async(req,res)=>{
    try {
        const data=req.body
        const isready=await Accountservice.VerifyAccount(data)
        res.json(isready)
    } catch (error) {
        
    }
}

module.exports={AccountGoogle,AccountRegister,AccountVerify,AccountLogin}