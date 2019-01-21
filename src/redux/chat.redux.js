import io from 'socket.io-client'
import axios from 'axios'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    unread: 0
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read).length}
        case MSG_LIST:
            return  
        case MSG_LIST:
            return  
        default: 
        return state
    }
}

function msgList(msgs){
    return {type: 'MSG_LIST',payload: msgs}
}

export function getMsgList(){
    return dispatch => {
        axios.get('/user/getmsglist').then(res => {
            if(res.status == 200 && res.data.code == 200){
                dispatch(msgList(res.data.msgs))
            }
        })
    }
}