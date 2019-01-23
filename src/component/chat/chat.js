import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import '../../index.css'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
@connect(
    state => state,
    {
        getMsgList,
        sendMsg,
        recvMsg
    }
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            msg: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.bindValue = this.bindValue.bind(this)
    }

    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    handleSubmit(){
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text: ''
        })

    }

    bindValue(v){
        this.setState({
            text: v
        })
    }

    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar 
                icon={<Icon type="left" />}
                onLeftClick={() => {
                    this.props.history.goBack()
                }}
                mode='dark'>{users[userid].name}</NavBar>
                
                {this.props.chat.chatmsg.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    console.log(userid)
                    return v.from == userid?(
                        <List key={v._id}>
                            <Item
                            thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item 
                                extra={<img src={avatar} />}
                                className='chat-me'>{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {this.bindValue(v)}}
                            extra={
                                <span
                                    onClick={()=>{this.handleSubmit()}}
                                >发送</span>
                            }
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat