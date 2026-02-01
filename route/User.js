const express=require("express")
const Router=express.Router()
const UserControl=require("../controler/User")

//get user data
Router.route("/")
//update user data
Router.route("/detail")
Router.route("/taskcreate").post(UserControl.TaskCreate)

module.exports=Router