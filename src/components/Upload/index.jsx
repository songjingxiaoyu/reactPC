

import React, { Component } from 'react'
import {Button,message,
    Upload as AntdUpload//as重命名
} from 'antd'
import { UploadOutlined } from "@ant-design/icons";
import * as qiniu from "qiniu-js"; // 七牛上传SDK
import { nanoid } from "nanoid"; // 用来生成唯一id
import { reqGetUploadToken } from "@api/edu/upload";
import qiniuConfig from "@conf/qiniu";

const MAX_VIDEO_SIZE = 35 * 1024 * 1024; // 35mb

export default class Upload extends Component {

    //从本地读取uploadToken
    getUploadToken=()=>{
        try{
            const {uploadToken,expires}=JSON.parse(
                localStorage.getItem('upload_token')
            )
            if(!this.isValidUploadToken(expires)){
                throw new Error('uploadToken过期了')
            }
            return{
                uploadToken,
                expires
            }
        }catch{
            return{
                uploadToken:'',
                expires:0
            }
        }
    }
    //初始化状态
    state={
        ...this.getUploadToken(),
        isUploadSuccess:false
    }
    fetchUploadToken=async ()=>{
        const {uploadToken,expires}=await reqGetUploadToken()
        this.saveUploadToken(uploadToken,expires)
    }
    //判断uploadToken是否有效/true有效
    isValidUploadToken=(expires)=>{
        return expires > Date.now()
    }
    //保存uploadToken
    saveUploadToken=(uploadToken,expires)=>{
        const data={
            uploadToken,
            expires:Date.now() + expires*1000 - 5*60*1000
        }
        this.setState(data)
        localStorage.setItem('upload_token',JSON.stringify(data))
    }
    //上传之前触发函数
    beforeUpload=(file,fileList)=>{
        return new Promise(async (resolve, reject)=>{
            if(file.size>MAX_VIDEO_SIZE){
                message.warn('上传视频不能超过35mb')
                return reject()
            }
            const {expires}=this.state
            if(!this.isValidUploadToken(expires)){
                await this.fetchUploadToken()
            }
            resolve(file)
        })
    }
    //自定义上传视频方案
    customRequest=({file, onProgress, onSuccess, onError})=>{
        const {uploadToken}=this.state
        const key = nanoid(10)
        const putExtra={
            fname:'',
            mimeType:['video/mp4'],
        }
        const config={
            // 当前对象存储库位于区域（华东 华南 华北...）
            // qiniu.region.z0: 代表华东区域
            // qiniu.region.z1: 代表华北区域
            // qiniu.region.z2: 代表华南区域
            // qiniu.region.na0: 代表北美区域
            // qiniu.region.as0: 代表东南亚区域
            region:qiniu.region.z1
        }
        const observable=qiniu.upload(file,key,uploadToken, putExtra,config)
        const observer={
            next(res){
                const percent = res.total.percent.toFixed(2)
                onProgress({percent},file)
            },
            error(err){
                onError(err)
                message.error('上传视频失败')
            },
            complete(res){
                onSuccess(res)
                message.success('上传视频成功')
                const video=qiniuConfig.prefix_url+res.key
                this.props.onChange(video)
                this.setState({
                    isUploadSuccess:true,
                })
            }
        }
        this.subscription=observable.subscribe(observer)
    }
    //上传取消
    componentWillUnmount(){
        this.subscription && this.subscription.unsubscribe()
    }
    //
    remove=()=>{
        this.subscription && this.subscription.unsubscribe()
        this.props.onChange('')
        this.setState({
            isUploadSuccess:false
        })
    }
    render() {
        const {isUploadSuccess} = this.state
        return (
            <AntdUpload 
            accept="video/mp4"
            listType="picture"
            beforeUpload={this.beforeUpload} 
            customRequest={this.customRequest}
            onRemove={this.remove}>
                {isUploadSuccess ? null : (
                <Button>
                    <UploadOutlined/>上传视频
                </Button>
                )}
            </AntdUpload>
        )
    }
}
