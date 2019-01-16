import React from 'react'
import '../../index.css'
import { NavBar, Icon, TabBar} from 'antd-mobile';
import { connect } from 'react-redux';
import NavLinkBar from '../navlink/navlink'
import { Route, Switch } from 'react-router-dom'
import Boss from '../../component/boss/boss'

function Genius() {
    return (
        <h2>Genius首页</h2>
    )
}
function Msg() {
    return (
        <h2>Msg首页</h2>
    )
}
function User() {
    return (
        <h2>User首页</h2>
    )
}

@connect(
    state => state
)
class Dashboard extends React.Component{

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
            },
    
        ]
        return (
            <div>
                <NavBar
                className="fixd-header"
                mode="dark"
                >{navList.find(v=>v.path==pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component} ></Route>
                        ))}
                    </Switch>
                </div>
                
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}



export default Dashboard