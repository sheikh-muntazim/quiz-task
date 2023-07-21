import quizModel from "../models/quizSchema.js";
import {userModel} from "../models/userSchema.js"
import mongoose from "mongoose";


class userController {

    // for adding a new user
    static addUser =async(req,res)=>{
        const {name,mobile,email,birthdate,gender,address,city} = req.body
        console.log(birthdate);
        if (name && mobile && email && birthdate && gender && address && city) {
         
        const user = new userModel({
            name,
            mobile,
            email,
            birthdate:new Date(birthdate),
            gender,
            address,
            city
        } )

        try {
            await user.save()
            console.log(user);
          return  res.send({"stutus":"success","message":"user added successfully","user_id":user._id})
        } catch (error) {
            res.send({"stutus":"failed","message":error.message})

        }   
        } else {
           return res.send({"stutus":"failed","message":"all fields are required"})

        }

    }

    //add user quiz
    static addUserQuiz =async(req,res)=>{
        const {user_id,quiz_id} = req.params
        const {start_time,option_list,status,finish_duration,finish_time,total_marks} = req.body
    
        let user;
        let quiz;

        try {
             user = await userModel.findById(user_id) 
             console.log(user);
             quiz =await quizModel.findById(quiz_id)
            if (!user) {
               return res.status(404).json({"stutus":"failed","message":"user not found"})
            }

            if (!quiz) {
                return res.status(404).json({"stutus":"failed","message":"Quiz not found"})
            }


        } catch (error) {
            console.log(error);
        }

        console.log(quiz.duration);
        const startTime =new Date(start_time)
        const quizEndTime =new Date(startTime.getTime() + parseInt(quiz.duration) * 1000)
        const currentTime =new Date()
        if (currentTime > quizEndTime) {
            return res.status(400).json({"stutus":"failed","message":"Quiz time out"})
        }
        const userQuiz = {
            user_obj:user.toObject(),
            start_time,
            end_time:quizEndTime,
            option_list:option_list,
            status,
            finish_time,
            finish_duration,
            total_marks

        }

        user.quizes.push(userQuiz)

        try {
            await user.save()
            return res.json({status:"success",message:"user quiz added successfully",user})
        } catch (error) {
            console.log(error);
            return res.status(400).json({"stutus":"failed",error:error.message})

        }

    }

    // Get Highest Score of User

    static getHighestScore =async(req,res)=>{
        const {user_id} =req.params
        try {
            
       
        const user= await userModel.findById(user_id)
        console.log(user_id);

        if (!user) {
            return res.status(404).json({ "stutus":"failed","message": "User not found" });
        }

   
           const highestScore = await userModel.aggregate([{$match:{_id:user._id}},{$unwind:'$quizes'},
           {$unwind:'$quizes.option_list' },
            {$match:{'quizes.option_list.is_answer':true}},
            {$group:{_id:'$_id',HighScore:{$sum:'$quizes.option_list.marks'}}}]) 
        console.log(highestScore,'score');
        res.json({status:"success",highestScore})
        
        } catch (error) {
            console.log(error);
        }


    }

    //update user question
    static updateQuestion =async(req,res)=>{
        const {user_id,quiz_id,question_id}=req.params
        const {option} =req.body

        try {
            const user =await userModel.findById(user_id)
            const quiz =await quizModel.findById(quiz_id)
        
            
            if (!user) {
                return res.status(400).json({"stutus":"failed","message":"User not found"})

            }

            if (!quiz) {
                return res.status(400).json({"stutus":"failed","message":"Quiz not found"})

            }

        } catch (error) {
            
        }
    }
}


export default userController