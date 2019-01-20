import React from 'react'
import Logo from '../../component/logo/logo'
import {NavBar,Radio,Toast, Icon, List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import imoocForm from '../../component/imooc-form/imooc-form'

const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {
      register  
    }
)
@imoocForm
class Register extends React.Component{
    constructor(props){
        super(props);

        this.login = this.login.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount(){
        this.props.handleChange('type','genius');
    }

    login(){
        this.props.history.push('/login')
    }

    handleRegister(){
        this.props.register(this.props.state)
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
                        onChange={(v)=>this.props.handleChange('user',v)}>用户</InputItem>
                        <InputItem
                        type="password"
                        onChange={(v)=>this.props.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem
                        type="password"
                        onChange={(v)=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <RadioItem
                    onChange={()=>this.props.handleChange('type','genius')} 
                    checked={this.props.state.type == 'genius'}>
                        达人
                    </RadioItem>
                    <RadioItem
                    onChange={()=>this.props.handleChange('type','boss')} 
                    checked={this.props.state.type == 'boss'}>
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