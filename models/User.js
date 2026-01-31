const { Schema } = require("mongoose");
const mongoose = require("../config/MongoDb_config");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String }, // hashed if local login
  provider:{type:String,required:true},
  emailVerified:{require:true,type:Boolean},
  otp:{type:Number},
  otpExpiry:{type:Number},
  userdata:{type:Object},
  role:{type:String}
});

module.exports = mongoose.model("User", UserSchema);