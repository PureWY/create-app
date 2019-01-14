import React from 'react'
import Logo from '../../component/logo/logo'
import {NavBar,Radio,Toast, Icon, List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {
      register  
    }
)
class Register extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            type: 'genius',
            user: '',
            pwd: '',
            repeatpwd: ''
        };

        this.login = this.login.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    login(){
        this.props.history.push('/login')
    }
    handleChange(key,val){
        this.setState({
            [key]: val
        })
    }
    handleRegister(){
        this.props.register(this.state)
        console.log(this.props)
    }

    failToast(msg) {
        Toast.fail(msg, 1);
    }
      

    render(){
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={this.login}
                >用户注册</NavBar>
                <Logo></Logo>
                {this.props.msg?<p style={{color: "red"}}>{this.props.msg}</p>:null}
                <WingBlank>
                    <List>
                        <InputItem
                        onChange={(v)=>this.handleChange('user',v)}>用户</InputItem>
                        <InputItem
                        type="password"
                        onChange={(v)=>this.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem
                        type="password"
                        onChange={(v)=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <RadioItem
                    onChange={()=>this.handleChange('type','genius')} 
                    checked={this.state.type == 'genius'}>
                        达人
                    </RadioItem>
                    <RadioItem
                    onChange={()=>this.handleChange('type','boss')} 
                    checked={this.state.type == 'boss'}>
                        BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button onClick={this.handleRegister} type="primary">注册</Button>
                    <WhiteSpace/>
                </WingBlank>
            </div>
            
        )
    }
}

export default Register