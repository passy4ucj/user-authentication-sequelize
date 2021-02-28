const { User } = require('../models')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs')
const hashPassword = require('../utils/hashPassword')


const register = asyncHandler(async (req, res) => {
    const {
        email,
        role,
        password
    } = req.body
    //let password = req.body.password

    //const password = hashPassword(req.body.password)

   
        const isExists = await User.findAll({ where: {email} })
        if(isExists.length > 0) {
            res.status(400)
            throw new Error(`The user with ID  ${req.body.email} has already been created`)
        }

        const salt = await bcrypt.genSalt(10)
        //const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            email,
            role,
            password:  await bcrypt.hash(password, salt)
        })

        res.json({
            success: true,
            newUser
        })
        // res.json({
        //     email,
        //     role,
        //     password: await bcrypt.hash(password, salt)
        // })
   
})

const login = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body

    const user = await User.findOne({ where: {email} })
    if(!user) {
        res.status(400)
        throw new Error(`Invalid Credentials`)
    }

    // Check if password matchs
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        res.status(401)
        throw new Error(`Invalid Credentials`)
    }

    
    res.json({
        success: true,
        user,
        token: generateToken(user.uuid),
    })
})

module.exports = {
    register,
    login
}