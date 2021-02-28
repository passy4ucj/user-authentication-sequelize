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

module.exports = {
    register
}