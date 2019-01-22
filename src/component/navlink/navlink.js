import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
        return (
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item
                            badge={v.path=='/msg'?this.props.unread:0}
                            title={v.text}
                            key={v.text}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                            />
                            }
                            // icon={{uri: require(`./img/${v.icon}.png`)}}
                            selected={pathname == v.path}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        ></TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar