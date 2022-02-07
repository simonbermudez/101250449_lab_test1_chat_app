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
    
    socket.emit('welcome', 'Welcome to Socket Programming : ' + socket.id)
    //console.log(socket)

    //Custom message event to socket
    socket.on('message', (data) => {
        console.log(data)

        //These will send to current/sending client
        //socket.emit('newMessage', data)
        //These will send to all connected client
        //io.sockets.emit('newMessage', data)
        //These will send to all except sender
        //socket.broadcast.emit('newMessage', data)
        
        //Send to ROOM
        //io.to(roomName).emit('newMessage', data)
        console.log(`Room Name: ${data.room}`)
        socket.broadcast.to(data.room).emit('newMessage', data.message)

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
