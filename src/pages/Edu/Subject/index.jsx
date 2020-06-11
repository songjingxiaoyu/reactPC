

import React, { Component } from "react";
import {Button,Table,Tooltip,Input,message,Modal } from "antd"
import {PlusOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons"
import { connect } from "react-redux";
import { getSubjectList,getSubSubjectList,updateSubject } from './redux'
import {reqDelSubject} from '@api/edu/subject'
import './index.less'

@connect((state)=>({subjectList:state.subjectList}),
{
  getSubjectList,
  getSubSubjectList,
  updateSubject,
})
class Subject extends Component {
  state={
    expandedRowKeys:[],
    subjectId:'',
    subjectTitle:'',
    updateSubjectTitle:'',
    current: 1, 
    pageSize: 10,
  }
  // state={
  //   subjects:{
  //     total:0,
  //     items:[]
  //   }
  // }
  componentDidMount(){
    this.getSubjectList(1,10)
  }
  // getSubjectList= async (page,limit)=>{
  //   const result = await reqGetSubjectList(page,limit)
  //   this.setState({
  //     subjects:result
  //   })
  // };
  // handleExpand=(expanded,record)=>{
  //   if(!expanded) return
  //   this.props.getSubSubjectList(record._id)
  // }
  //点击展开一级菜单
  handleExpandedRowsChange=(expandedRowKeys)=>{
    // console.log('handleExpandedRowsChange',expandedRowKeys);
    const length=expandedRowKeys.length;
    if(length>this.state.expandedRowKeys.length){
      const lastKey=expandedRowKeys[length-1]
      this.props.getSubSubjectList(lastKey)
    }
    this.setState({
      expandedRowKeys
    })
  }
  //显示添加页面
  showAddSubject=()=>{
    this.props.history.push('/edu/subject/add')
  }
  //解决在第二页切换时每页数量显示不正确
  getFirstPageSubjectList=(page,limit)=>{
    this.getSubjectList(1,limit);
  }
  //显示更新分类
  showUpdateSubject=(subject)=>{
    return ()=>{
      if(this.state.subjectId){
        message.warn('请更新课程分类')
        return
      }
      this.setState({
        subjectId:subject._id,
        subjectTitle:subject.title
      })
    }
  }
  //收集更新分类标题数据
  handleInputChange=(e)=>{
    this.setState({
      updateSubjectTitle:e.target.value
    })
  }
  //更新课程分类
  updateSubject=async ()=>{
    const {subjectId,updateSubjectTitle,subjectTitle}=this.state
    if(!updateSubjectTitle){
      message.warn('请输入要更新的课程分类标题')
      return
    }
    if(updateSubjectTitle===subjectTitle){
      message.warn('请输入要更新的课程分类标题不能与之前一样')
      return
    }
    await this.props.updateSubject(updateSubjectTitle,subjectId)
    message.success("更新分类数据成功")
    this.cancel()
  }
  //取消更新课程分类
  cancel=()=>{
    this.setState({
      subjectId:'',
      updateSubjectTitle:'',
    })
  }
  //删除课程分类
  delSubject=(subject)=>{
    return()=>{
      Modal.confirm({
        title:(
          <p>
            你确认要删除<span className="subject-text">{subject.title}</span>{" "}课程分类吗？
          </p>
        ),
        icon:<ExclamationCircleOutlined/>,
        onOk:async ()=>{
          await reqDelSubject(subject._id);
          message.success("删除课程分类数据成功~");
          const {current,pageSize} = this.state;
          if(
            current>1 && 
            this.props.subjectList.items.length===1 &&
            subject.parentId==="0"
          ){
            this.getSubjectList(current-1,pageSize)
            return
          }
          this.getSubjectList(current,pageSize)
        }
      })
    }
  }

  getSubjectList=(page,limit)=>{
    this.setState({
      current:page,
      pageSize:limit,
    })
    return this.props.getSubjectList(page,limit)
  }

  render() {
    const {subjectList}=this.props
    const {expandedRowKeys,current,pageSize} = this.state
    const columns=[
      {
        title:'分类名称',
        // dataIndex:'title',
        key:'title',
        render:(subject)=>{
          const {subjectId}=this.state;
          const id = subject._id
          if(subjectId===id){
            return (
              <Input className="subject-input" defaultValue={subject.title} onChange={this.handleInputChange}/>
            )
          }
        return <span>{subject.title}</span>
        }
      },
      {
        title:'操作',
        dataIndex:'',
        key:'action',
        width:200,
        render: (subject)=>{
          const {subjectId}=this.state;
          const id = subject._id
          if(subjectId===id){
            return (
              <>
              <Button type="primary" onClick={this.updateSubject}>确认</Button>
              <Button className="subject-btn" onClick={this.cancel}>取消</Button>
              </>
            )
          }
          return(
            <>
          <Tooltip title="更新课程分类">
          <Button type="primary" onClick={this.showUpdateSubject(subject)}>
            <FormOutlined/>
          </Button>
          </Tooltip>

          <Tooltip title="删除课程分类">
          <Button type="danger" className="subject-btn" onClick={this.delSubject(subject)}>
            <DeleteOutlined/>
          </Button>
          </Tooltip>
          </>
          )
        }
      }
    ]
    return (
      <div className="subject">
        <Button type="primary" className="subject-btn" onClick={this.showAddSubject}>
          <PlusOutlined/>新建
        </Button>
        <Table columns={columns}
        expandable={{
        expandedRowKeys,
        onExpandedRowsChange:this.handleExpandedRowsChange,
        // onExpand:this.handleExpand,
        // rowExpandable:(record)=>record.name !== "Not Expandable"
        }}
        dataSource={subjectList.items} rowKey="_id"
        pagination={{
            current,
            pageSize,
            total: subjectList.total, 
            showQuickJumper: true, 
            showSizeChanger: true, 
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: this.getSubjectList,
            onShowSizeChange:this.getFirstPageSubjectList
        }}/>
      </div>
    );
  }
}

export default Subject