import React from 'react'
import { connect } from 'react-redux'
import { Result,Modal, List,Button,Toast, Icon,WingBlank, WhiteSpace } from 'antd-mobile';
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux' 
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    {
        logoutSubmit
    }
)
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(){
        const alert = Modal.alert
            alert('注销', '确定退出登录 ？', [
            { text: '取消', onPress: () => console.log('取消'), style: 'default' },
            { text: '确定', onPress: () => {
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            } },
            ]);
    }

    render(){
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief

        return props.user?(
            <div>
               <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} alt="" style={{width: 50}} />}
                    title={props.user}
                    message={props.type=='boss'?props.company:null}
                /> 
                <List renderHeader={()=>'个人简介'} >
                    <Item
                        multipleLine
                    >
                    {props.title}
                    {this.props.desc.split('\n').map(v=>(
                        <Brief key={v}>{v}</Brief>
                    ))}
                    {this.props.money?<Brief>薪资：{this.props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={this.props.redirectTo}/>
    }
}

export default User