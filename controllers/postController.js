const { Post, User } = require('../models')
const asyncHandler = require('express-async-handler')
const user = require('../models/user')

const createPost = asyncHandler(async (req, res) => {
    const { userUuid, body } = req.body
    try {
        const user = await User.findOne({ where: { uuid: userUuid } })

        const post = await Post.create({ body, userId: user.id })

        res.status(201).json({
            post
        })
    } catch (error) {
        res.status(500)
        throw new Error(`Server error`)
    }
})


const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.findAll({ include: ['user'] })

        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        res.status(500)
        throw new Error('No posts')
    }
})


module.exports = {
    createPost,
    getPosts,
}