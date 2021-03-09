const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { User } = require('../models')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            
            //req.patient = await Patient.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, Token Failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

// Grant access to specific role
const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is unauthorized to access this route`, 403))
        }
        next()
    }
}


module.exports =  { protect, authorize }