const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./mongoose')

const app = express()

//连接数据库
db()

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/user',userRouter)

app.listen(9093, () => {
    console.log('App listening on port 9093!');
});
