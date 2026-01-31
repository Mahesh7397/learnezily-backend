const Transporter=require('../config/NodeMail_config')

const SendOTP=async(data)=>{
    await Transporter.transporter.sendMail({
        to: data.email,
    subject: "Your verification OTP",
    html: `<h2>Your OTP: ${data.otp}</h2><p>Valid for 10 minutes</p>`,
    })
}

module.exports={SendOTP}