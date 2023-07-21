import express from 'express'
import QuizController from '../controllers/quizController.js'

const quizRouter =express.Router()

//for adding quiz
quizRouter.post('/add/new/quiz',QuizController.addQuiz)

quizRouter.get('/get/all',QuizController.getAll)

export default quizRouter