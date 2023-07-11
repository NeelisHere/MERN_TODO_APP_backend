import { User } from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.json({
            success: true,
            users
        })
    } catch (error) {
        return next(error)
    }
}

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        let user = await User.findOne({ username, email })
        if (user)
            return next(new ErrorHandler('User already exists', 401))
        const hash = await bcrypt.hash(password, 10)
        user = await User.create({ ...req.body, password: hash })
        sendCookie(user, res, 'Registration successful', 201)
    } catch (error) {
        return next(new ErrorHandler('username or email already taken', 400))
    }
}

export const login = async (req, res, next) => {
    console.log('inside loginUser function...')
    try {
        const { username, password } = req.body
        let user = await User.findOne({ username }).select('+password')
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return next(new ErrorHandler('Invalid username or password', 404))
        const login_successful_msg = `Welcome back ${user.username}`
        sendCookie(user, res, login_successful_msg, 200)
    } catch (error) {
        return next(new ErrorHandler('User not found', 404))
    }
}


export const logout = (req, res) => {
    res.status(200)
        .cookie('token', '', {
            expires: new Date(Date.now()),
            sameSite: 'none',
            secure: true
        })
        .json({
            success: true,
            message: 'User have been logged out successfully'
        })
}


export const getUserProfile = (req, res) => {
    console.log('inside getUserProfile controller...')
    res.status(200).json({
        success: true,
        user: req.user
    })
}