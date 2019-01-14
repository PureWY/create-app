const express = require('express')
const Router = express.Router()
const User = require('./model.js')

Router.post('/register',function(req,res){
    console.log(req.body)
    const {user,pwd,type} = req.body
    User.findOne({user: user},function(err,doc){
        if(doc){
            return res.json({
                code: 201,
                message: '该用户已存在'
            })
        }
        console.log({user,pwd,type})
        User.create({user,pwd,type},function(err,doc){
            if(err){
                return res.json({
                    code: 202,
                    message: '数据库异常'
                })
            }
            return res.json({
                code: 200,
                message: '注册成功'
            })
        })
    })
})


Router.get('/info',(req,res) => {
    res.json({
        code: 203
    })
})

module.exports = Router
