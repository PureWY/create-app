import React from 'react'
import '../../index.css'
import { NavBar, Icon, TabBar} from 'antd-mobile';
import { connect } from 'react-redux';
import NavLinkBar from '../navlink/navlink'
import { Route, Switch } from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'


function Msg(){
    return (
        <h1>消息页面</h1>
    )
}

@connect(
    state => state,
    {
        getMsgList,
        sendMsg,
        recvMsg
    }
)
class Dashboard extends React.Component{

    componentDidMount() {
        this.props.getMsgList()
        this.props.recvMsg()
    }

    render(){
        const {pathname} = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: '达人',
                icon: 'boss',
                title: '达人列表',
                component: Boss,
                hide: user.type == 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type == 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '个人中心',
                icon: 'user',
                title: '个人中心',
                component: User
            }
    
        ]
        const list = navList.find(v=>v.path==pathname)
        console.log(list)
        return (
            <div>
                <NavBar
                className="fixd-header"
                mode="dark"
                >{list?list.title:null}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component} ></Route>
                        ))}
                    </Switch>
                    <NavLinkBar data={navList}></NavLinkBar>
                </div>
            </div>
        )
    }
}



export default Dashboard