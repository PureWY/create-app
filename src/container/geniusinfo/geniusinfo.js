import React from 'react'
import { NavBar, Icon, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    {
        update
    }
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            desc: '',
            avatar: ''
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(key,val){
        this.setState({
            [key]: val
        })
    }


    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark">达人信息完善</NavBar>
                <AvatarSelector
                selectAvatar={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}
                ></AvatarSelector>
                <InputItem onChange={(v) => this.onChange('title',v)}
                >求职岗位</InputItem>
                <TextareaItem 
                rows={3}
                title='个人简历'
                autoHeight
                onChange={(v) => this.onChange('desc',v)}
                ></TextareaItem>
                <Button
                onClick={()=>this.props.update(this.state)}
                type="primary">保存</Button>
            </div>
        )
    }
}

export default GeniusInfo