import doctorModel from "../models/doctorModel.js"

//add doctor
export const addDoctor = async (req, res) => {
    try {
        //❣️Check if get Bug
        //console.log("BODY:", req.body);
        //console.log("FILE:", req.file);

        const { name, about, degree, speciality, experience, fees, email, image, phone, address, dob, gender } = req.body;

        //validate fields
        if (!name || !about || !degree || !speciality || !experience || !fees || !email || !phone || !address || !dob || !gender) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            });
        }

        // ✅ validate image
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'Image is required'
            });
        }

        // ✅ check duplicate email
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).send({
                success: false,
                message: 'Doctor already exists'
            });
        }

        //convert image
        const photoBase64 = req.file && req.file.buffer.toString('base64')
        const doctorData = { name, about, degree, speciality, experience, fees, email, image: photoBase64, phone, address, dob, gender }
        const doctor = new doctorModel(doctorData)
        await doctor.save()

        res.status(201).send({
            success: true,
            message: 'Doctor Created',
            doctor,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Add Doctor API',
            error
        })

    }
}

//getALL Doctors
export const getAllDoctor = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Doctors list',
            totalCount: doctors.length,
            doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in get ALL Doctor API',
            error
        })
    }
}

//get doctor details
export const getDoctorDetails = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please add doctor ID"
            })
        }

        //find doc
        const doctor = await doctorModel.findById(id)
        if (!doctor) {
            return res.status(404).send({
                success: false,
                message: "No Doctor found with this ID"
            })
        }

        res.status(200).send({
            success: true,
            message: "Details Fetched Successfully",
            doctor
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Get Doctor details API',
            error
        })
    }
}

// update doctor || PATCH
export const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please add Doctor ID"
            })
        }
        const {
            name,
            about,
            degree,
            speciality,
            experience,
            fees,
            email,
            phone,
            address,
            dob,
            gender
        } = req.body

        let updateData = {
            name,
            about,
            degree,
            speciality,
            experience,
            fees,
            email,
            phone,
            address,
            dob,
            gender
        }

        if (req.file) {
            updateData.image = req.file.buffer.toString('base64')
        }

        // const photoToBase64 = req.file && req.file.buffer.toString('base64')
        const doctor = await doctorModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true })

        res.status(200).send({
            success: true,
            message: 'Doctor Details Updated Successfully',
            doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong in update doctor api",
            error,
        })

    }
}

//delete Doctor || DELETE
export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide doctor ID'
            })

        }
        //find doctor
        const doctor = await doctorModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Doctor has been deleted'
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in DELETE Doctor API',
            error
        })
    }
}

//update AVAILABLE status
export const updateAvailableStatus = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide doctor ID'
            })
        }
        const { availableStatus } = req.body
        if (availableStatus === undefined) { //adjusted
            return res.status(404).send({
                success: false,
                message: 'Please provide available status'
            })
        }
        const doctor = await doctorModel.findByIdAndUpdate(
            id,
            { $set: { available: availableStatus } },
            { returnOriginal: false })
        res.status(200).send({
            success: true,
            message: 'Doctor AVAILABLE Status has been Updated'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in update AVAILABLE Doctor API',
            error
        })
    }
}