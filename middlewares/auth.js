import { User } from "../models/user.js"
import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req, res, next) => {
    console.log('Authenticating user...')
    const { token } = req.cookies
    if(!token){
        return res.status(404).json({
            success: false,
            message: 'User not logged in'
        })
    }
    const decoded_data = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded_data)
    req.user = await User.findById(decoded_data._id)
    next()
}