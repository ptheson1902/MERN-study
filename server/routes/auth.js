const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/Users')
const verifyToken = require('../middleware/auth')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
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
        const user = await User.findById(req.userId).select('-password')
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'User not found' })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @route POST /api/auth/register
// @desc Register User
// @access Public
router.post('/register', async (req, res) => {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    const { username, password } = req.body

    //simple validation
    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password!',
        })

    try {
        // check for existing user
        const user = await User.findOne({ username })
        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'username already taken!' })

        // all good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword,
        })
        await newUser.save()

        // Return token by JWT
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET,
        )
        res.json({
            success: true,
            message: 'User created successfully!',
            accessToken,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @route POST /api/auth/login
// @desc Login User
// @access Public

router.post('/login', async (req, res) => {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    const { username, password } = req.body

    // Simple Validation
    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing ussername and/or password!',
        })
    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Incorrect ussername and/or password!',
            })

        // Username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({
                success: false,
                message: 'Incorrect ussername and/or password!',
            })
        // Return token by JWT
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
        )
        res.json({
            success: true,
            message: 'User logged is successfully!',
            accessToken,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

module.exports = router
