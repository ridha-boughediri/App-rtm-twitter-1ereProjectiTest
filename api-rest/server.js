const express = require("express");
const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const router = require('./routes/users')
const bodyParser = require('body-parser')
var path=require('path')

let DB = require('./db.config')

const routeRooms = require('./routes/rooms')
const routeSports = require('./routes/sports')
const routeMessages = require('./routes/messages')
const routeNba =require('./routes/nbaTeams')
const routeNFl =require('./routes/nflTeams')
const routeNHl =require('./routes/nhlTeams')
const routePriveM =require('./routes/privateMessage')
const routeLogin = require('./routes/auth')

const routeRole = require('./routes/roles')

app.use(bodyParser.json())

app.use('/rooms',routeRooms)
app.use('/sports',routeSports)
app.use('/messages',routeMessages)
app.use('/nbaTeams', routeNba)
app.use('/nflTeams', routeNFl)
app.use('/nhlTeams', routeNHl)
app.use('/privateMessages',routePriveM)
app.use('/roles',routeRole)

app.use('/auth', routeLogin)
app.use('/users', router)


app.use(express.static(__dirname + '/public'));
// app.use('/', (req,res)=>{
//   res.sendFile(path.resolve('./public/index.html'))
// })

io.on('connection',(socket)=>{
    console.log('salut les socket')
    socket.on("disconnect",()=>{
        console.log('utilis deco')
    })
    socket.on('chat',(msg)=>{
        console.log(msg)
    })
})
const port = 8888
http.listen(8888, () => {
    console.log(`Example app listening on port ${port}`)

})
