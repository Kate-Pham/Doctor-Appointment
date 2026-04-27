import appointmentModel from "../models/appointmentsModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

//create
export const bookAppointment = async (req, res) => {
    try {
        //❣️Check if get Bug
        //console.log("BODY:", req.body);
        //console.log("FILE:", req.file);

        const { userId, doctorId, slotDate, slotTime, amount } = req.body;

        //validate fields
        if (!userId || !doctorId || !slotDate || !slotTime || !amount) {
            return res.status(400).send({
                success: false,
                message: 'Please Provide All Fields'
            });
        }

        const appointmentData = { userId, doctorId, slotDate, slotTime, amount }
        const appointment = new appointmentModel(appointmentData)
        await appointment.save()

        res.status(201).send({
            success: true,
            message: 'Appointment Booked Successfully',
            appointment
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Create Appointment API',
            error: error.message
        })

    }
}

//get ALL Appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Appointments',
            totalCount: appointments.length,
            appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in get ALL Appointment API',
            error: error.message
        })
    }
}

//get appointment details
export const getAppointmentDetails = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide Appointment ID"
            })
        }

        //find appointment
        const appointment = await appointmentModel.findById(id)
        if (!appointment) {
            return res.status(404).send({
                success: false,
                message: "No Appointment found with this ID"
            })
        }

        //find user & doctor
        const user = await userModel.findOne({ _id: appointment?.userId });
        const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });
        res.status(200).send({
            success: true,
            message: "Appointment Details Fetched Successfully",
            appointmentDetails: {
                clientName: user?.name,
                clientPhone: user?.phone,
                clientEmail: user?.email,
                doctorName: doctor?.name,
                doctorPhone: doctor?.phone,
                doctorEmail: doctor?.email,
                bookingDate: appointment?.slotDate,
                bookingTime: appointment?.slotTime,
                amount: appointment?.amount,
                bookingStatus: appointment?.status,
                paymentMode: appointment?.payment,
                createAt: appointment?.createdAt
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Get Appointment details API',
            error
        })
    }
}

//change status || PATCH
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Appointment ID"
            })
        }
        const { appointmentStatus } = req.body
        if (!appointmentStatus) { //adjusted
            return res.status(404).send({
                success: false,
                message: "Please Provide Appointment Status"
            })
        }

        const appointment = await appointmentModel.findByIdAndUpdate(
            id,
            { $set: { status: appointmentStatus } },
            { returnOriginal: false }
        )

        res.status(200).send({
            success: true,
            message: 'Appointment Status has been Updated',
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong in update Appointment status api",
            error,
        })

    }
}

//user appointments
export const getUserAppointments = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Appointment ID"
            })
        }

        const user = await userModel.findById(id)
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        const appointment = await appointmentModel.find({ userId: user?._id })
        res.status(200).send({
            success: true,
            message: "Your Appointments",
            totalCount: appointment.length,
            appointment
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong in get User Appointment API",
            error,
        })
    }
}

//get user appointment details
export const getUserAppointmentDetails = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide Appointment ID"
            })
        }

        //find user
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "No User found with this ID"
            })
        }

        //find appointment & doctor
        const appointment = await appointmentModel.findOne({ userId: user?._id });
        const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });
        res.status(200).send({
            success: true,
            message: "Appointment Details Fetched Successfully",
            appointmentDetails: {
                doctorName: doctor?.name,
                doctorPhone: doctor?.phone,
                doctorEmail: doctor?.email,
                bookingDate: appointment?.slotDate,
                bookingTime: appointment?.slotTime,
                amount: appointment?.amount,
                bookingStatus: appointment?.status,
                paymentMode: appointment?.payment,
                createAt: appointment?.createdAt
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Get Appointment details API',
            error
        })
    }
}

//cancel user booking status
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide Appointment ID"
            })
        }

        const appointment = await appointmentModel.findById(id);
        if (!appointment) {
            return res.status(404).send({
                success: false,
                message: "No Appointment found with this ID"
            })
        }
        await appointment.updateOne({ $set: { status: "cancel" } })
        res.status(200).send({
            success: true,
            message: "Appointment Cancelled Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Cancel Appointment API',
            error: error.message
        })
    }
}

//delete appointment || DELETE
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide appointment ID'
            })

        }
        //find appointment
        const appointment = await appointmentModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Appointment has been deleted'
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in DELETE Appointment API',
            error
        })
    }
}
