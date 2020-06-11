
const express = require("express")
const Mock = require("mockjs")
const app = express()
//随机类
const Random = Mock.Random
//随机中文标题
Random.ctitle()
//使用cors解决跨域
app.use((req,res,next)=>{
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "content-type, token");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next(); 
  })



//模拟请求，并返回数据
//添加课程分类
app.post("/admin/edu/subject/save",(req,res,next)=>{
    //获取请求参数
    const{
        title,
        parentId
    }=req.body;
    console.log(title,parentId);
    //返回响应
    res.json({
      code:20000,
      success:true,
      data:{
          _id:Date.now(),
          title,
          parentId
      },
      message:""
  })

})


//获取二级分类数据
app.get("/admin/edu/subject/get/:parentId",(req,res,next)=>{
    //获取请求参数
    const{
        parentId,
    }=req.params;
    //模拟数据
    const total=Random.integer(0,5)
    const data=Mock.mock({
        total,
        [`items|${total}`]:[
            {
                "_id|+1":100,
                title:"@ctitle(2,5)",
                parentId,
            }
        ]
    })
    if(total===1){
        data.items=[data.items]
    }
    //返回响应
    res.json({
      code:20000,
      success:true,
      data,
      message:""
  })

})


//获取一级分类数据
app.get("/admin/edu/subject/:page/:limit",(req,res,next)=>{
      //获取请求参数
      const{
          page,
          limit,
      }=req.params;
      //模拟数据
      const data=Mock.mock({
          total:Random.integer(+limit+1,limit*2),
          [`items|${limit}`]:[
              {
                  "_id|+1":1,
                  title:"@ctitle(2,5)",
                  parentId:0,
              }
          ]
      })
      //返回响应
    res.json({
        code:20000,
        success:true,
        data,
        message:""
    })

})



//监听端口号 启动服务
app.listen(9527,"localhost",(err)=>{
    if(err){
        console.log("服务器启动失败",err);
        return
    }
    console.log("服务器启动成功");
})
  