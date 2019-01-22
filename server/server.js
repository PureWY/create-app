const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./mongoose')
const Chat = require('./chat')

const app = express()

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        console.log(data)
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
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
