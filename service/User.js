const User = require("../models/User")

const TaskCreate = async (data, email,userId) => {
    try {
        // let user = await User.findOne({ email: email })
        // const l=user.userdata
        // console.log(l)
        // if(!"task" in l || !"oneday" in l?.task || !"daily" in l?.task ) {
        //     user.userdata["task"]["daily"]=[]
        //     user.userdata["task"]={ oneday:{} }
        // }
        // console.log(user)
        // if (data.type === "daily") {
        //     user.userdata.task.daily.push(data.task)
        //     console.log(user)
        //     await User.findByIdAndUpdate(user._id,{
        //         $set:{
        //             userdata:user.userdata
        //         }
        //     },{new:true})
        // } else if (data.type === "oneday") {
        //     if (data.date in user?.userdata?.task?.oneday) {
        //         user.userdata.task.oneday[data.date].push(data.task)
        //     }
        //     else {
        //         user.userdata.task.oneday[data.date] = [data.task]
        //     }
        //     await User.findByIdAndUpdate(user._id,{
        //         $set:{
        //             userdata:user.userdata
        //         }
        //     },{new:true})
        // }
        // return {user}
         if (data.type === "daily") {
      return await User.findOneAndUpdate(
        { _id: userId,   // ✅ id check
      email: email   // ✅ email check
 },
        {
          $push: {
            "userdata.task.daily": data.task
          }
        },
        { new: true }
      );
    }

    if (data.type === "oneday") {
      return await User.findOneAndUpdate(
        { _id: userId,   // ✅ id check
      email: email   // ✅ email check
 },
        {
          $push: {
            [`userdata.task.oneday.${data.date}`]: data.task
          }
        },
        { new: true }
      );
    }

    } catch (error) {
        console.log(error)
    }
}

const TaskDelete = async (data, email,userId) => {
    try {
        // let user = await User.findOne({ email: email })
        // if (data.type === "daily") {
        //     user.userdata.task.daily.pop(data.task)
        //     await User.findByIdAndUpdate(user._id,{
        //         $set:{
        //             userdata:user.userdata
        //         }
        //     },{new:true})
        // } else if (data.type === "oneday") {
        //     if (data.date in user.userdata.task.oneday) {
        //         user.userdata.task.oneday[data.date].pop(data.task)
        //     }
        //     await User.findByIdAndUpdate(user._id,{
        //         $set:{
        //             userdata:user.userdata
        //         }
        //     },{new:true})
        // }
        // return user
           if (data.type === "daily") {
      return await User.findOneAndUpdate(
        { _id: userId,   // ✅ id check
      email: email   // ✅ email check
 },
        {
          $pull: {
            "userdata.task.daily": data.task
          }
        },
        { new: true }
      );
    }

    // ONEDAY TASK DELETE
    if (data.type === "oneday") {
      return await User.findOneAndUpdate(
        { _id: userId,   // ✅ id check
      email: email   // ✅ email check
},
        {
          $pull: {
            [`userdata.task.oneday.${data.date}`]: data.task
          }
        },
        { new: true }
      );
    }
    } catch (error) {

    }
}

const TaskUpdate = async (data, email,userId) => {
    try {
        // let user = await User.findOne({ email: email })
        // if (data.type === "daily") {
        //     user.userdata.task.daily = user.userdata.task.daily.map((d) => {
        //         if (d.id === data.task.id) return data.task
        //         return d
        //     })
        //     await User.findByIdAndUpdate(user._id,{
        //         $set:{
        //             userdata:user.userdata
        //         }
        //     },{new:true})
        // } else if (data.type === "oneday") {
        //     if (data.date in user.userdata.task.oneday) {
        //         user.userdata.task.oneday[data.date] = user.userdata.task.oneday[data.date].map((d) => {
        //             if (d.id === data.task.id) return data.task
        //             return d
        //         })
        //         console.log(user.userdata.task.oneday)
        //     await User.findByIdAndUpdate(user._id,{
        //         $set:{
        //             userdata:user.userdata
        //         }
        //     },{new:true})
        //     }
        // }
        // return user
        if (data.type === "daily") {
      return await User.findOneAndUpdate(
        {
          _id: userId,   // ✅ id check
      email: email ,  // ✅ email check
          "userdata.task.daily.id": data.task.id
        },
        {
          $set: {
            "userdata.task.daily.$": data.task
          }
        },
        { new: true }
      );
    }

    // ONEDAY TASK UPDATE
    if (data.type === "oneday") {
      return await User.findOneAndUpdate(
        {
          _id: userId,   // ✅ id check
      email: email,   // ✅ email check
          [`userdata.task.oneday.${data.date}.id`]: data.task.id
        },
        {
          $set: {
            [`userdata.task.oneday.${data.date}.$`]: data.task
          }
        },
        { new: true }
      );
    }
    } catch (error) {
        console.log(error)
    }
}

const addSubject = async (email, sem, subject,userId) => {
  return await User.findOneAndUpdate(
    { _id: userId,   // ✅ id check
      email: email   // ✅ email check
},
    {
      $push: {
        [`userdata.subject.${sem}`]: subject
      }
    },
    { new: true }
  );
};


const deleteSubject = async (email, sem, subjectId,userId) => {
  return await User.findOneAndUpdate(
    { _id: userId,   // ✅ id check
      email: email   // ✅ email check
 },
    {
      $pull: {
        [`userdata.subject.${sem}`]: { id: subjectId }
      }
    },
    { new: true }
  );
};


const updateSubject = async (email, sem, updatedSubject,userId) => {
  return await User.findOneAndUpdate(
    {
      _id: userId,   // ✅ id check
      email: email,   // ✅ email check
      [`userdata.subject.${sem}.id`]: updatedSubject.id
    },
    {
      $set: {
        [`userdata.subject.${sem}.$`]: updatedSubject
      }
    },
    { new: true }
  );
};

const addGrade = async (email, sem, grades,userId) => {
  return await User.findOneAndUpdate(
    { _id: userId,   // ✅ id check
      email: email   // ✅ email check
},
    {
      $push: {
        [`userdata.grades.${sem}`]: grades
      }
    },
    { new: true }
  );
};


const deleteGrade = async (email, sem, gradesId,userId) => {
  return await User.findOneAndUpdate(
    { _id: userId,   // ✅ id check
      email: email   // ✅ email check
},
    {
      $pull: {
        [`userdata.grades.${sem}`]: { id: gradesId }
      }
    },
    { new: true }
  );
};


const updateGrade = async (email, sem, updatedgrades,userId) => {
  return await User.findOneAndUpdate(
    {
      _id: userId,   // ✅ id check
      email: email,   // ✅ email check
      [`userdata.grades.${sem}.id`]: updatedgrades.id
    },
    {
      $set: {
        [`userdata.grades.${sem}.$`]: updatedgrades
      }
    },
    { new: true }
  );
};

const updateUser = async (email, key, value,userId) => {
  return await User.findOneAndUpdate(
    { _id: userId,   // ✅ id check
      email: email   // ✅ email check
 },                 // ✅ correct filter
    {
      $set: {
        [`userdata.${key}`]: value   // ✅ dynamic key
      }
    },
    { new: true }
  );
};

const GetUserdata=async(id,email)=>{
    try {
        const user=await User.findOne({_id:id,email:email})
        if(!user) return {message:"user not exites"}
        return {user}
    } catch (error) {
        
    }
}



module.exports = { TaskCreate, TaskDelete,TaskUpdate,addSubject,deleteSubject,updateSubject,addGrade,deleteGrade,updateGrade,updateUser,GetUserdata}