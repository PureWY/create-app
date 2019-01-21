const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./mongoose')

const app = express()

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        io.emit('recvmsg',data)
    })
})

//连接数据库
db()

app.use(cookieParser());

//post请求URL解析
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/user',userRouter)

server.listen(9093, () => {
    console.log('App listening on port 9093!');
});
