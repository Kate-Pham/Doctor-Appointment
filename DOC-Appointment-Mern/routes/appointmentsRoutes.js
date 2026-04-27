import express from 'express'
import { isAdmin, userAuth } from '../middlewares/authMiddlewares.js'
import { bookAppointment, cancelAppointment, getAllAppointments, getAppointmentDetails, getUserAppointmentDetails, getUserAppointments, updateAppointmentStatus } from '../controllers/appointmentsController.js'

const router = express.Router()

//CREATE || POST
router.post('/create', userAuth, bookAppointment)

//GET-ALl || GET
router.get('/get-all', userAuth, isAdmin, getAllAppointments)

//GET-DETAILS || GET
router.get('/get-details/:id', userAuth, isAdmin, getAppointmentDetails)

//UPDATE-STATUS || PATCH
router.patch('/update-status/:id', userAuth, isAdmin, updateAppointmentStatus)

//GET ALL USER APPOINTMENT || GET
router.get('/get-user-appointments/:id', userAuth, getUserAppointments)

//GET-DETAILS USER APPOINTMENT || GET
router.get('/get-user-appointment-details/:id', userAuth, isAdmin, getUserAppointmentDetails)

//CANCEL USER APPOINTMENT || POST
router.post('/cancel/:id', userAuth, cancelAppointment)

export default router