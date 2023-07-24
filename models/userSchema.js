import mongoose from "mongoose";

const optionListSchema =new mongoose.Schema({
    question_id:{type:mongoose.Schema.Types.ObjectId},  
    option:{type:String}, 
    marks:{type:Number},
    is_answer:{type:Boolean}
})

const userSchema=new mongoose.Schema({
name: { type: String },
mobile: { type: String },
email: { type: String },
birthdate: { type: Date },
gender: { type: String },
address: { type: String },
city: { type: String },
quizes:[{
    user_obj:{},
    quiz_id:{type:mongoose.Schema.Types.ObjectId},
    start_time:{type:String},
    end_time:{type:String},
    option_list:[optionListSchema],
    status:{type:String,default:'pending'},
    total_marks:{type:Number},
    finish_time:{type:String},
    finish_duration:{type:String}
}]
})



const userModel=mongoose.model('User',userSchema)


export {userSchema,userModel}