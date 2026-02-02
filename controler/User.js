const UserService=require('../service/User')


const TaskCreate=async(req,res)=>{
    try {
        const data=req.body
        const param={type:data.type,date:data?.date,task:data.task}
        const isready=await UserService.TaskCreate(param,data.email,req.user.id)
        res.json({message:"task added successfuly"})
    } catch (error) {
        
    }
}

const TaskUpdate=async(req,res)=>{
    try {
        const data=req.body
        const param={type:data.type,date:data?.date,task:data.task}
        const isready=await UserService.TaskUpdate(param,data.email,req.user.id)
        res.json({message:"task added successfuly"})
    } catch (error) {
        
    }
}

const TaskDelete=async(req,res)=>{
    try {
        const data=req.body
        const param={type:data.type,date:data?.date,task:data.task}
        const isready=await UserService.TaskDelete(param,data.email,req.user.id)
        res.json({message:"task added successfuly"})
    } catch (error) {
        
    }
}

const SubjectAdd=async(req,res)=>{
    try {
        const data=req.body
        const isready=await UserService.addSubject(data.email,data.sem,data.subject,req.user.id)
        res.json({message:"subject add successfuly"})
    } catch (error) {
        
    }
}

const SubjectDelete=async(req,res)=>{
    try {
         const data=req.body
        const isready=await UserService.deleteSubject(data.email,data.sem,data.id,req.user.id)
        res.json({message:"subject add successfuly"})
    } catch (error) {
        
    }
}

const SubjectUpdate=async(req,res)=>{
    try {
         const data=req.body
        const isready=await UserService.updateSubject(data.email,data.sem,data.subject,req.user.id)
        res.json({message:"subject add successfuly"})
    } catch (error) {
        
    }
}

const UserUpdate=async(req,res)=>{
    try {
        const data=req.body
        const isready =await UserService.updateUser(data.email,data.key,data.value,req.user.id)
        res.json({message:"user update successfuly"})
    } catch (error) {
        
    }
}

const GetUserdata=async(req,res)=>{
    try {
        const data=req.body
        const isready=await UserService.GetUserdata(req.user.id,data.email)
        res.json(isready) 
    } catch (error) {
        
    }
}

const AddGrade=async(req,res)=>{
    try {
         const data=req.body
        const isready=await UserService.addGrade(data.email,data.sem,data.grade,req.user.id)
        res.json({message:"grade added successfuly"})
    } catch (error) {
        
    }
}

const UpdateGrade=async(req,res)=>{
    try {
        const data=req.body
        const isready=await UserService.updateGrade(data.email,data.sem,data.grade,req.user.id)
        res.json({message:"grade added successfuly"})
    } catch (error) {
        
    }
}

const DeleteGrade=async(req,res)=>{
    try {
        const data=req.body
        const isready=await UserService.deleteGrade(data.email,data.sem,data.grade,req.user.id)
        res.json({message:"grade added successfuly"})
    } catch (error) {
        
    }
}

module.exports={TaskCreate,TaskUpdate,TaskDelete,SubjectAdd,SubjectDelete,SubjectUpdate,UserUpdate,GetUserdata,AddGrade,UpdateGrade,DeleteGrade}