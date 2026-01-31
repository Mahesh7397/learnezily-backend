const express=require("express")
const Accountroute=require("./route/Account")
const Mongoos=require("./config/MongoDb_config");
const { logger } = require("./middleware/Handlelogs");
const bodyParser = require("body-parser");
const cors =require("cors");
const cookieParser=require("cookie-parser");


const PORT = process.env.PORT || 5000;
const app=express()

app.use(cookieParser());
app.use(express.json());
app.use(logger)
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use("/auth",Accountroute)

app.get("/test", (req, res) => {
  res.json({ message: "Connected successfully to server" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
