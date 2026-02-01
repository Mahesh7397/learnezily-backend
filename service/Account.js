const User = require("../models/User")
const bcrypt=require("bcrypt");

const {SendOTP}=require("../middleware/Otp_Sender")

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


const GoogleAccount=async(data)=>{
    try {
        let user=await User.findOne({email:data.email})
        if(!user){
            user=await User.create({
                email:data.email,
                googleId:data.sub,
                provider:"google",
                emailVerified:true,
                userdata:{
                    OnBoardingfinish:false,
                      task:{
                        daily:[],
                        oneday:{null:null}
                    },
                    subject:{},
                    grade:{},
                    cradit:0
                },
                role:process.env.CODE_USER
            })
        }
        return {user}
    } catch (error) {

    }
}

const EmailAccount=async(data)=>{
    try {
        let user=await User.findOne({email:data.email})
        if(user!==null) return false
        else{
            const otp=generateOTP()
            const passwordhash=await bcrypt.hash(data.password,10)
            user=await User.create({
                email:data.email,
                password:passwordhash,
                provider:"email",
                emailVerified:false,
                otp:otp,
                otpExpiry:Date.now() + 10 * 60 * 1000,
                userdata:{
                    OnBoardingfinish:false,
                    task:{
                        daily:[],
                        oneday:{}
                    },
                    subject:{},
                    grade:{},
                    cradit:0
                },
                role:process.env.CODE_USER
            })
            const edata={
                otp:otp,
                email:data.email,
            }
            SendOTP(edata)
            return true
        }
    } catch (error) {
        console.log(error)
    }
}

const VerifyAccount=async(data)=>{
    try {
    const user = await User.findOne({ email:data.email });
    console.log(user)
  if (!user) {
    return { message: "User not found" }
  }

  if (
    user.otp !== Number(data.otp) ||
    user.otpExpiry < Date.now()
  ) {
    return { message: "Invalid or expired OTP" }
  }

  user.emailVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();
  return { code:20, message: "Email verified successfully" }
    } catch (error) {
        console.log(error)
    }
}

const EmailLogin=async(data)=>{
    try {
        
  const user = await User.findOne({ email:data.email });
  if (!user || !user.password)
    return { code:23, message: "Incorrect Email and Password" };

  const ok = await bcrypt.compare(data.password, user.password);
  if (!ok) return { code:40, message: "Invalid credentials" }
  if (!user.emailVerified) return { code:30, message:"Verify your email"}
  return {user}
    } catch (error) {
        
    }
}

module.exports={GoogleAccount,EmailAccount,VerifyAccount,EmailLogin}