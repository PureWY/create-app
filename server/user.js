const express = require('express')
const utils = require('utility')
const Router = express.Router()
const User = require('./model.js')
const _filter = {'pwd': 0,'__v': 0}

Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    console.log(userid)
    if(!userid){
        return res.dumps({
            code: 220,
            message: '用户未登录或登录超时'
        })
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        if(err){
            console.log(err)
        }
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        },body)
        res.json({
            code: 200,
            body: data
        })
    })
    
})

Router.post('/login',(req,res) => {
    const { user,pwd } = req.body
    User.findOne({user,pwd: md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            res.json({
                code: '201',
                message: '用户不存在或密码错误'
            })
        }else{
            res.cookie('userid',doc._id)
            res.json({
                code: '200',
                message: '登录成功',
                body: doc
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
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(err,doc){
            if(err){
                return res.json({
                    code: 202,
                    message: '数据库异常'
                })
            }
            const {user,type,_id}  = doc
            res.cookie('userid',doc._id)
            return res.json({
                code: 200,
                body: {user,type,_id},
                message: '注册成功'
            })
        })
    })
})

Router.get('/info',(req,res) => {
    const { userid } = req.cookies
    if(!userid){
        return res.json({
            code: 220,
            message: '数据库异常'
        })
    }
    User.findOne({_id: userid},_filter,function(err,doc){
        if(err){
            return res.json({
                code: 201,
                message: '数据库异常'
            })
        }
        if(doc){
            return res.json({
                code: 200,
                body: doc
            })
        }
    })
})

function md5Pwd(pwd){
    const salt = 'wy_ajshdjashdjkkasdhjahsjkd'
    return utils.md5(utils.md5(salt+pwd))
}

module.exports = Router
