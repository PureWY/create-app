const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/imooc'

module.exports = ()=> {
    mongoose.connect(DB_URL,{useNewUrlParser:true});  //连接数据库
    //实例化连接对象
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,'连接错误：'));
    db.once('open',(callback) => {
        console.log('MongoDB连接成功!');
    });
    return db;
}