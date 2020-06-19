
//已注册用户，并返回token（query参数）
import React, { Component } from 'react'
import{connect} from 'react-redux'
import { loginSync } from "@redux/actions/login";


@connect(null,{loginSync})
class Oauth extends Component {
    componentDidMount(){
        //获取token
        const token=this.props.location.search.split('=')[1]
        //保存在redux
        this.props.loginSync(token)
        //保存在本地
        localStorage.setItem('user_token',token)
        //跳转页面
        this.props.history.replace('/')
    }
    render() {
        return (
            <div>
                授权登录中...
            </div>
        )
    }
}

export default Oauth