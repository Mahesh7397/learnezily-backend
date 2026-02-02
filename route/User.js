const express=require("express")
const Router=express.Router()
const UserControl=require("../controler/User")

//get user data
Router.route("/")
.get(UserControl.GetUserdata)
.post(UserControl.UserUpdate)
//update user data
Router.route("/grade")
.post(UserControl.AddGrade)
.put(UserControl.UpdateGrade)
.delete(UserControl.DeleteGrade)

Router.route("/task")
.post(UserControl.TaskCreate)
.put(UserControl.TaskUpdate)
.delete(UserControl.TaskDelete)

Router.route("/subject")
.post(UserControl.SubjectAdd)
.put(UserControl.SubjectUpdate)
.delete(UserControl.SubjectDelete)


module.exports=Router