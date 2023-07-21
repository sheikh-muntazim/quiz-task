import quizModel from "../models/quizSchema.js";


class QuizController {
    //for adding a quiz
    static addQuiz = async(req,res)=>{
console.log('er');
       const  {
            quiz_name,
            quiz_desktop_image,
            quiz_mobile_image,
            sponser_logo_list,
            title,
            sub_title,
            description,
            speciality,
            note,
            total_question_marks,
            passing_mark,
            duration,
            status,
            date,
            question_list
            } =req.body
        console.log(req.body);

        const quiz =new quizModel({
            quiz_name,
            quiz_desktop_image,
            quiz_mobile_image,
            sponser_logo_list,
            title,
            sub_title,
            description,
            speciality,
            note,
            total_question_marks,
            passing_mark,
            duration,
            status,
            date,
            question_list
        })
        try {

            await quiz.save()
            res.send({"stutus":"success","message":"Quiz added successfully","quiz_id":quiz._id,"created at":new Date()})

        } catch (error) {
            console.log(error);
            res.send({"stutus":"failed","message":error.message})

        }

    }


    // for getting all quiz
    static getAll =async(req,res)=>{

        try {
            const quizes = await quizModel.find().select('-user_list')
            console.log(quizes);
            res.send({"stutus":"success",quizes})
        } catch (error) {
            res.send({"stutus":"failed","message":error.message})

        }
    }


    //
}


export default QuizController