import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace} from 'antd-mobile'

class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        axios.get('/user/list?type=genius').then(res => {
            if(res.data.code == 200){
                this.setState({
                    data: res.data.body
                })
            }
        })
    }

    render(){
        console.log(this.state.data)
        return (
            <div>
                <WingBlank>
                    {this.state.data.map(v=>(
                        v.avatar?
                        <Card key={v._id}>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            > 
                            </Card.Header>
                            <Card.Body>
                                {v.desc.split('\n').map(v=>(
                                    <div key={v}>{v}</div>
                                ))}
                            </Card.Body>
                        </Card>:null
                    ))}
                </WingBlank>
            </div>
        )
    }
}

export default Boss