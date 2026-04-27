import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema(
    {
        name: { type: String, require: [true, 'name is required'] },
        about: { type: String, require: [true, 'about is required'] },
        degree: { type: String, require: [true, 'degree is required'] },
        speciality: { type: String, require: [true, 'speciality is required'] },
        experience: { type: String, require: [true, 'experience is required'] },
        fees: { type: String, require: [true, 'fees is required'] },
        email: { type: String, require: [true, 'email is required'], unique: true },
        image: { type: String },
        phone: { type: String },
        address: { type: String },
        dob: { type: String },
        gender: { type: String },
        available: { type: Boolean, default: true },

    },

    { timestamps: true })

//specify the model
const doctorModel = mongoose.model('doctor', doctorSchema)

export default doctorModel