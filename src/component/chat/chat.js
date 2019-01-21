import React from 'react'

class Chat extends React.Component{
    render() {
        return (
            <h2>聊天详情页面{this.props.match.params.user}</h2>
        )
    }
}

export default Chat