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

    //Get User name
    socket.on('newUser', (name) => {
        console.log(name)
        //users.push({name, id: socket.id})
        //users.push(socket.id)
        users.push(name)
        console.log(users)
    })


    //Group/Room Join
    socket.on('joinroom', (room) => {
        socket.join(room)
        roomName = room
    })
   
    //io.in(roomName).emit('newMessage', 'New message')

    //Disconnected
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

http.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})
