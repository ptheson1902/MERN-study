const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Post = require('../models/Posts')

// @Router POST api/post
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    const { title, description, url, status } = req.body

    //Simple validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' })
    try {
        const newPost = new Post({
            title,
            description,
            url:
                url.startsWith('https://') || url.startsWith('http://')
                    ? url
                    : `https://${url}`,
            status: status || 'To Learn',
            user: req.userId,
        })

        await newPost.save()
        res.json({
            success: true,
            message: 'Your work has added successfully. Happy!',
            post: newPost,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @Router GET api/post
// @desc Get post
// @access Private
router.get('/', verifyToken, async (req, res) => {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username',
        ])
        res.json({ success: true, posts })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @Router PUT api/post
// @desc PUT post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    const { title, description, url, status } = req.body

    //Simple validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' })
    try {
        let updatePost = {
            title,
            description: description || '',
            url:
                (url.startsWith('https://') || url.startsWith('http://')
                    ? url
                    : `https://${url}`) || '',
            status: status || 'To Learn',
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }

        updatePost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatePost,
            {
                new: true,
            },
        )

        // User not authorised to update post
        if (!updatePost)
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorised',
            })
        res.json({
            success: true,
            message: 'Your work has updated successfully',
            post: updatePost,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @Router DELETE api/post
// @desc DELETE post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        // User not authorised to delete post
        if (!deletePost)
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorised',
            })
        res.json({
            success: true,
            message: 'Your work has deleted successfully',
            post: deletePost,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

module.exports = router
