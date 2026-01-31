const express = require("express")
const Router=express.Router()
const Account=require("../controler/Account")

Router.route("/login").post(Account.AccountLogin)
Router.route("/google").post(Account.AccountGoogle)
Router.route("/register").post(Account.AccountRegister)
Router.route("/verify-otp").post(Account.AccountVerify)


module.exports=Router