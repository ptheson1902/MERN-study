require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const app = express()
const cors = require('cors')

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.ufac2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
        )
        console.log('Connect MongoDB Successfuly!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
