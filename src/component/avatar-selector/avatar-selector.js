import React from 'react'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        const avatarList = 'header1,header2,header3,header4,header5,header6,header7,header8,header9,header10,header11,header12'.split(',').map(v => ({
            icon: require(`../img/${v}.jpg`),
            text: v
        }))
        const gridHeader = this.state.icon ? 
                            (<div>
                                <span>已选择头像</span>
                                <img style={{width: 20}} src={this.state.icon} />
                                </div>) :
                                <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                <Grid 
                    data={avatarList}
                    onClick={elm => {
                        this.setState(elm)
                        this.props.selectAvatar(elm.text)
                    }}
                />
                </List>
            </div>
        )
    }
}

export default AvatarSelector