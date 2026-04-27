import userModel from "../models/userModel.js"
import doctorModel from "../models/doctorModel.js"
import appointmentsModel from "../models/appointmentsModel.js"
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        //validation
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }

        //hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = { name, email, password: hashedPassword }
        //save user
        const newUser = new userModel(userData)
        const user = await newUser.save()

        res.status(201).send({
            success: true,
            message: 'Register Succesfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

//LOGIN
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please add Email or Password'
            })
        }

        //find user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            })
        }

        //match password
        const isMatch = await bcrypt.compare(password, user?.password)
        if (!isMatch) {
            return res.status(402).send({
                success: false,
                message: 'invalid Credential'
            })
        }

        //token JWT
        const token = JWT.sign({ id: user?._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',

        })
        user.password = undefined
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            token,
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

// update user details
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "User Id Not Found"
            })
        }
        const { name, phone, dob, image, gender, address } = req.body
        const photoToBase64 = req.file && req.file.buffer.toString('base64')
        const user = await userModel.findByIdAndUpdate(id, {
            $set: { name, dob, address, phone, gender, image: photoToBase64 }
        }, { returnOriginal: false })
        res.status(200).send({
            success: true,
            message: 'Profile Updated Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong in update user api",
            error,
        })

    }
}

//password reset
export const updatePassword = async (req, res) => {
    try {
        //user id
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'User ID not found'
            })
        }

        //req.body
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide Ols & new Password'
            })
        }

        //find user
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(402).send({
                success: false,
                message: 'User not found'
            })
        }

        //check old password
        const isMatch = await bcrypt.compare(oldPassword, user?.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect old password'
            })
        }

        //hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        //update
        user.password = hashedPassword
        await user.save()

        res.status(200).send({
            success: true,
            message: 'Password Updated Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Update Password API',
            error
        })

    }
}

//GET ALL USERS
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: "All Users",
            totalCount: users.length,
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Get All Users API',
            error
        })
    }
}

//GET USER DETAILS & APPOINTMENT DETAILS
export const getUserDetails = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide user ID"
            })
        }
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "No user found with this ID"
            })
        }
        //find appointment
        const appointments = await appointmentsModel.find({ userId: user?._id })
        res.status(200).send({
            success: true,
            message: "Details Fetched Successfully",
            user,
            appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Get User Details API',
            error
        })
    }
}

//GET STATISTICS - can use for thousands/millions of records
export const getStats = async (req, res) => {
    try {
        const [users, doctors, appointments] = await Promise.all([
            userModel.countDocuments(),
            doctorModel.countDocuments(),
            appointmentsModel.aggregate([
                {
                    $group: {
                        _id: null,
                        totalEarnings: { $sum: { $toDouble: "$amount" } } //Chuyển amount sang kiểu số thực (double)
                    }
                }
            ])
        ])

        const total = appointments.length > 0 ? appointments[0].totalEarnings : 0

        res.status(200).send({
            success: true,
            message: "All Stats",
            stats: {
                totalUsers: users,
                totalDoctors: doctors,
                earnings: total
            }

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In Get All Stats API",
            error: error.message
        })
    }
}

//GET LOGIN USERS.  10:27:00
export const getLoginUsers = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({
                success: false, message: 'User ID is required'
            })
        }
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).send({
                success: false, message: 'User not found'
            })
        }
        res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error fetching user data',
            error: error.message
        })
    }
}