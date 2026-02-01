const { param } = require('../route/Account')
const UserService=require('../service/User')

const DetailUpdate=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

const TaskCreate=async(req,res)=>{
    try {
        const data=req.body
        const param={type:data.type,date:data?.date,task:data.task}
        const isready=await UserService.TaskCreate(param,data.email)
        res.json({message:"task added successfuly"})
    } catch (error) {
        
    }
}

const TaskUpdate=async(req,res)=>{
    try {
        const data=req.body
        const param={type:data.type,data:data?.date,task:data.task}
        const isready=await UserService.TaskUpdate(param,data.email)
        res.json({message:"task added successfuly"})
    } catch (error) {
        
    }
}

module.exports={TaskCreate,TaskUpdate}