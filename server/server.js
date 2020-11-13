const PORT = process.env.PORT || 5000
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const server = app.listen(PORT, console.log(`Server is starting in ${PORT}`))
const io = require('socket.io').listen(server)
const routes = require('./routes/api')

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://thiago:1234@cluster0.jhejj.gcp.mongodb.net/sharePad?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected')
})

io.on('connection', (socket) => {

    socket.on('joinRoom', (e) => {
        socket.join(e)

        io.in(e).clients((err,clients_) => {
            room = clients_.length

            io.in(e).emit('sendInfos',{roomUsers:room})
        })
    })

    socket.on('sendMessage', (e) => {
        socket.to(e.room).emit('message',e.text)
    })

    socket.on('disconnecting', () => {
        const e = Object.keys(socket.rooms)[1]
        io.in(e).clients((err,clients_) => {
            room = clients_.length
            io.in(e).emit('sendInfos',{roomUsers:room-1})
        })
    })

})

app.use(cors())
app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('tiny'))

app.use('/',routes)