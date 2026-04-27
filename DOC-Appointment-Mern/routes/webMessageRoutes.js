import express from 'express'
import { createMessage, deleteMessage, getAllMessages } from '../controllers/webMessageController.js'
import { isAdmin, userAuth } from '../middlewares/authMiddlewares.js'

const router = express.Router()

//CREATE MESSAGE || POST
router.post('/create', createMessage)

//GET ALL MESSAGES || GET
router.get('/get-all', getAllMessages)

//DELETE MESSAGE || DELETE
router.delete('/delete/:id', userAuth, isAdmin, deleteMessage)

export default router