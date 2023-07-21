import express from 'express'
import userController from '../controllers/userController.js'
const userRouter =express.Router()

userRouter.post('/add/new/user',userController.addUser)
userRouter.post('/:user_id/quizes/:quiz_id',userController.addUserQuiz)
userRouter.get('/:user_id/highest-user',userController.getHighestScore)
userRouter.put('/:user_id/quizes/:quiz_id/question/:question_id',userController.updateQuestion)

export default userRouter