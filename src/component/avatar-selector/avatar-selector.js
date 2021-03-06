import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
    static propTypes = {
        selectAvatar: PropTypes.func
    }
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        const avatarList = '鼠,牛,虎,兔,龙,蛇,马,羊,猴,鸡,狗,猪'.split(',').map(v => ({
            icon: require(`../img/${v}.png`),
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