const express = require('express')
const utils = require('utility')
const Router = express.Router()
const User = require('./model.js')

Router.post('/login',(req,res) => {
    const { user,pwd } = req.body
    User.findOne({user,pwd: md5Pwd(pwd)},function(err,doc){
        if(!doc){
            res.json({
                code: '201',
                message: '用户不存在或密码错误'
            })
        }else{
            res.json({
                code: '200',
                message: '登录成功',
                body: {
                    user: doc.user,
                    type: doc.type
                }
            })
        }

    })
})

Router.post('/register',function(req,res){
    const {user,pwd,type} = req.body
    User.findOne({user: user},function(err,doc){
        if(doc){
            return res.json({
                code: 201,
                message: '该用户已存在'
            })
        }
        console.log({user,pwd,type})
        User.create({user,pwd: md5Pwd(pwd),type},function(err,doc){
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

function md5Pwd(pwd){
    const salt = 'wy_ajshdjashdjkkasdhjahsjkd'
    return utils.md5(utils.md5(salt+pwd))
}

module.exports = Router
