import jwt from "jsonwebtoken"

export const sendCookie = (user, res, message, statusCode=200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    const cookieOptions = {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: 'none',
        secure: true
    }
    res.status(statusCode)
        .cookie('token', token, cookieOptions)
        .json({
            success: true,
            message
        })
}