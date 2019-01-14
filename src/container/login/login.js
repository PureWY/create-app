import React from 'react'
import Logo from '../../component/logo/logo'
import {NavBar, Icon, List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Login extends React.Component{
    constructor(props){
        super(props);

        this.register = this.register.bind(this)
    }

    register(){
        this.props.history.push('/register')
    }

    handleLogin(){
        this.props.history.push('/bossinfo')
    }

    render(){
        return (
            <div>
                <NavBar mode="dark">用户登录</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem
                        type="password">密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login