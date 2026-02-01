const User = require("../models/User")

const TaskCreate = async (data, email) => {
    try {
        let user = await User.findOne({ email: email })
        const l=user.userdata
        console.log(l)
        if(!"task" in l || !"oneday" in l?.task || !"daily" in l?.task ) {
            user.userdata["task"]["daily"]=[]
            user.userdata["task"]={ oneday:{} }
        }
        console.log(user)
        if (data.type === "daily") {
            user.userdata.task.daily.push(data.task)
            console.log(user)
            await User.findByIdAndUpdate(user._id,{
                $set:{
                    userdata:user.userdata
                }
            },{new:true})
        } else if (data.type === "oneday") {
            if (data.date in user?.userdata?.task?.oneday) {
                user.userdata.task.oneday[data.date].push(data.task)
            }
            else {
                user.userdata.task.oneday[data.date] = [data.task]
            }
            await User.findByIdAndUpdate(user._id,{
                $set:{
                    userdata:user.userdata
                }
            },{new:true})
        }
        return {user}
    } catch (error) {
        console.log(error)
    }
}

const TaskDelete = async (data, email) => {
    try {
        let user = await User.findOne({ email: email })
        if (data.type === "daily") {
            user.userdata.task.daily.pop(data.task)
            await User.findByIdAndUpdate(user._id,{
                $set:{
                    userdata:user.userdata
                }
            },{new:true})
        } else if (data.type === "oneday") {
            if (data.date in user.userdata.task.oneday) {
                user.userdata.task.oneday[data.date].pop(data.task)
            }
            await User.findByIdAndUpdate(user._id,{
                $set:{
                    userdata:user.userdata
                }
            },{new:true})
        }
        return user
    } catch (error) {

    }
}

const TaskUpdate = async (data, email) => {
    try {
        let user = await User.findOne({ email: email })
        if (data.type === "daily") {
            user.userdata.task.daily = user.userdata.task.daily.map((d) => {
                if (d.id === date.id) return data.task
                return d
            })
            await User.findByIdAndUpdate(user._id,{
                $set:{
                    userdata:user.userdata
                }
            },{new:true})
        } else if (data.type === "oneday") {
            if (data.date in user.userdata.task.oneday) {
                user.userdata.task.oneday[data.date] = user.userdata.task.oneday[data.date].map((d) => {
                    if (d.id === date.id) return data.task
                    return d
                })
            }
            await User.findByIdAndUpdate(user._id,{
                $set:{
                    userdata:user.userdata
                }
            },{new:true})
        }
        return user
    } catch (error) {

    }
}

const SubjectUpdate = async (data) => {
    try {

    } catch (error) {

    }
}

const GradeUpdate = async (data) => {
    try {

    } catch (error) {

    }
}

const CreditUpdate = async (data) => {
    try {

    } catch (error) {

    }
}

const UpdateAccount = async (data) => {
    try {

    } catch (error) {

    }
}

module.exports = { TaskCreate, TaskDelete,TaskUpdate, SubjectUpdate, GradeUpdate, CreditUpdate }