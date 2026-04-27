import mongoose from "mongoose"

const webMessageSchema = new mongoose.Schema(
    {
        name: { type: String, require: [true, 'name is required'] },
        contact: { type: String, require: [true, 'contact number or email is required'] },
        message: { type: String, require: [true, 'message is require'] }

    },
    { timestamps: true })

//specify the model
const webMessageModel = mongoose.model('webmessage', webMessageSchema)

export default webMessageModel