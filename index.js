const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const mongoose = require('mongoose');

const PORT = 3000


//Create Server Socket
const io = require('socket.io')(http)

// Cross Origin Requests 
app.use(cors())

// JSON payload
app.use(express.json())

// Load .env files
const dotenv = require("dotenv")
dotenv.config()

// import Routers
const authRouter = require('./routes/AuthRoutes')
const messageRouter = require('./routes/MessageRoutes')
const userRouter = require('./routes/UserRoutes')
const roomRouter = require('./routes/RoomRoutes')

// Use Routers
app.use('/auth', authRouter)
app.use('/messages', messageRouter)
app.use('/users', userRouter)
app.use('/rooms', roomRouter)

//Connect Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/templates/chat.html')
})

//Accept new request
io.on('connection', (socket) => {
    console.log('Connected ')

    //Custom message event to socket
    socket.on('messageSent', (data) => {
        socket.broadcast.emit('messageReceived')
    })

    socket.on('writing', (user) => {
        socket.broadcast.emit('isWriting', user)
    })

    socket.on('stopWriting', (user) => {
        socket.broadcast.emit('stopWriting', user)
    })

    //Disconnected
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

http.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})
