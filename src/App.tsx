import { useState,useEffect } from 'react'

import {message} from 'antd';
import React from 'react';
import {UpCircleOutlined} from "@ant-design/icons";
//展示路由组件
import {useRoutes,useLocation,Link,useNavigate} from 'react-router-dom'
import router from './router'
//import {useNavigate} from "react-router-dom";
/*
* Outlet 路由组件展示
* Link 标签组件展示
* Navigate 路由重定项
*useRoutes(router) 解析路由列表 创建路由对象
*
*
*
* */
import Registers from '@/views/Register'
//首页
function ToPage1(){
  const navigateTo = useNavigate()

  //jsx组件，有div,加载完实现跳转,下面模拟生命周期
  useEffect(()=>{
  //
    navigateTo('/page1')
    message.warning('您已经登录过了！')

  },[])
  return <div></div>
}

//登录页
function ToLogin(){
  const navigateTo = useNavigate()

  //jsx组件，有div,加载完实现跳转,下面模拟生命周期
  useEffect(()=>{
    //
    navigateTo('/login')
    message.warning('您还没有登录，请登录后再访问！')
  },[])
  return <div></div>
}
//登录页
function ToRegister(){
  const navigateTo = useNavigate()

  //jsx组件，有div,加载完实现跳转,下面模拟生命周期
  useEffect(()=>{
    //
    navigateTo('/register')
    message.success('欢迎注册！')
  },[])
  return <Registers/>
}





//路由卫士
function BeforeRouterEnter(){
  /*
  * 后台系统两种经典跳转
  * 1.如果访问登录页，有token，跳转到首页
  * 2.如果访问的不是登录页，没有token，跳转到登录页
  * 3.其他outlet
  *
  * */
  const location = useLocation()
  let token = localStorage.getItem('react-token')
  if(location.pathname === '/login' && token){
    //跳转，不能直接用
    return <ToPage1 />
  }
  if(location.pathname !== '/login' && !token){
    if(location.pathname === '/register'){
      return <ToRegister/>
    }
    //跳转，不能直接用
    return <ToLogin />
  }





  const outlet = useRoutes(router)
  return outlet
}



function App() {
    return (
    <div className="App">
        <BeforeRouterEnter />
    </div>
  )
}

export default App
