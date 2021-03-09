const express = require('express')
const { register, login, getUsers } = require('../controllers/userController')
const { protect, authorize } = require('../middleware/authMiddleware')


const router = express.Router()


router.route('/')
    .post(register)
    .get(getUsers)

router.route('/login').post(login)


module.exports = router