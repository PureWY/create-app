import axios from "axios";
import { stat } from "fs";
import { getRedirectPath } from '../util'
 
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG ='ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
    redirectTo: '',
    isAuth: '',
    msg: '',
    user: '',
    pwd: '',
    type: ''
}

// reducer
export function user(state = initState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {...state, msg: '',redirectTo: getRedirectPath(action.payload),isAuth: true,...action.payload}
        case REGISTER_SUCCESS: 
            return {...state, msg: '',redirectTo: getRedirectPath(action.payload),isAuth: true,...action.payload}
        case LOAD_DATA: 
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth: false,msg: action.msg}
        default:
            return state
    }

    return state
}

function loginSuccess(data){
    return { type: LOGIN_SUCCESS,payload: data}
}

function registerSuccess(data){
    return { type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg){
    return { msg, type: ERROR_MSG}
}

export function loadData(userinfo){
    return { type: LOAD_DATA,payload: userinfo}
}

export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('请输入用户名和密码')
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd}).then(res => {
            if(res.status == 200&&res.data.code == 200){
                dispatch(loginSuccess(res.data.body))
            }else{
                dispatch(errorMsg(res.data.message))
            }
        })
    }
}

export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('请输入用户名和密码')
    }
    if(pwd!==repeatpwd){
        return errorMsg('两次密码不一致')
    }
    return dispatch => {
        axios.post('/user/register',{user,pwd,type}).then(res =>{
            if(res.status == 200 && res.data.code == 200){
                dispatch(registerSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.message))
            }
        })
    }
}

