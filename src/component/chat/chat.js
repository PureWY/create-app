import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import '../../index.css'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
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
            msg: [],
            showEmoji: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.bindValue = this.bindValue.bind(this)
        this.fixCarouse = this.fixCarouse.bind(this)
    }

    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        this.fixCarouse()
    }

    fixCarouse(){
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        },0)
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
        const emoji = '😀 😄 😅 🤣 😂 🙂 😇 😍 😜 🤗 🤐 😏 😒 🙄 😬 😪 😴 😓 🤢 🤮 🤧 🥵 🥶 🥴 😵 🤯 🤠 🥳 😎 🤓 🙁 🧐 😲 🥺 😳 😨 😱 😓 😈 👿 💀 ☠️ 💩 🤡 👻'
                        .split(' ')
                        .filter(v=>v)
                        .map(v=>({text: v}))
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        return (
            <div id='chat-page'>
                <NavBar 
                icon={<Icon type="left" />}
                onLeftClick={() => {
                    this.props.history.goBack()
                }}
                mode='dark'>{users[userid].name}</NavBar>
                
                {chatmsgs.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
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
                                <div>
                                    <span 
                                    onClick={()=>{
                                        this.fixCarouse()
                                        this.setState({
                                            showEmoji: !this.state.showEmoji
                                        })
                                    }}
                                    style={{marginRight:15}}>😀</span>
                                    <span
                                    onClick={()=>{this.handleSubmit()}}
                                    >发送</span>
                                </div>
                                
                            }
                        ></InputItem>
                    </List>
                    {
                      this.state.showEmoji?<Grid
                        columnNum={9}
                        isCarousel={true}
                        carouselMaxRow={4}
                        onClick={v => {
                            this.setState({
                                text: this.state.text + v.text
                            })
                        }}
                        data={emoji} 
                    />:null  
                    }
                    
                </div>
            </div>
        )
    }
}

export default Chat