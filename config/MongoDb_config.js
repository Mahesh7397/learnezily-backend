const mongoose = require('mongoose')
const dorenv =require('dotenv')

dorenv.config()

mongoose.connect(process.env.MONGO_DB)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

module.exports=mongoose