import webMessageModel from "../models/webMessage.js"

//create message
export const createMessage = async (req, res) => {
    try {
        //validation
        const { name, contact, message } = req.body
        if (!name || !contact || !message) {
            return res.status(402).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }
        const webMessage = new webMessageModel({ name, contact, message })
        webMessage.save()
        res.status(201).send({
            success: true,
            message: 'Your Message Sent Successfully',
            webMessage
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Web Message API',
            error
        })
    }
}

//getALL message
export const getAllMessages = async (req, res) => {
    try {
        const webMessages = await webMessageModel.find({});
        res.status(201).send({
            success: true,
            message: 'All web messages',
            totalCount: webMessages.length,
            webMessages
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in get ALL Web Messages API',
            error
        })
    }
}

//delete message
export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide message ID'
            })

        }
        //find message
        const webMessage = await webMessageModel.findByIdAndDelete(id)
        res.status(201).send({
            success: true,
            message: 'Message has been deleted'
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in DELETE Web Messages API',
            error
        })
    }
}