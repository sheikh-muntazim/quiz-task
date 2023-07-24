import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";

const questionOptionsSchema =new mongoose.Schema({
    option:{type:String},
    is_answer:{type:Boolean,default:false}

})

const questionSchema =new mongoose.Schema({
    question:{type:String},
    mark:{type:Number},
    option_list:[questionOptionsSchema]
})

const quizSchema = new mongoose.Schema({
    quiz_name:{type:String},
    quiz_desktop_image:{type:String},
    quiz_mobile_image:{type:String},
    sponser_logo_list:{type:Array },
    title:{type:String},
    sub_title:{type:String},
    description:{type:String},
    speciality:{type:String},
    note:{type:String},
    total_question_marks:{type:Number},
    passing_mark:{type:Number},
    duration:{type:String},
    status:{type:String,default:'SAVE'},
    date:{type:String},
    question_list:[questionSchema],
    user_list:[userSchema ]

})


const quizModel=mongoose.model('Quiz',quizSchema)

export default quizModel