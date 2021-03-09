const express = require('express')
const { register, login, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')
const { protect, authorize } = require('../middleware/authMiddleware')


const router = express.Router()


router.route('/')
    .post(register)
    .get(getUsers)

router.route('/:uuid') 
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/login').post(login)


module.exports = router