import React, {useEffect, Component, ChangeEvent, useState} from 'react';

//antd 组件
import {Button, Input, Space} from 'antd'

import styles from './login.module.scss'
import initLoginBg from './init'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './login.less'

const Index = ()=> {
    //加载完组件之后渲染背景
    useEffect(()=>{
        initLoginBg()
        //窗口改变，也进行初始化，自适应
        window.onresize = function(){initLoginBg()}
    },[])
    //获取用户登录信息
    //定义用户输入信息变量，一旦值改了，变量就改了，所以拿到usernameVal就拿到用户的输入信息
    const [usernameVal,setUsernameVal] =useState('')
    const [passwordVal,setPasswordVal] =useState('')
    const [captchaVal,setCaptchaVal] =useState('')
    const usernameChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUsernameVal(e.target.value);
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value);
    }
    const captchaChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value);
    }
    //登录事件
    const gotoLogin = () => {
        console.log('用户输入的信息',usernameVal,passwordVal,captchaVal)
    }

    console.log(usernameVal)
        return (
            <div className={styles.loginPage}>
                { /* 存放背景*/}
                <canvas id={'canvas'} style={{display:'block'}}></canvas>
                {/* 登录盒子*/}
                <div className={styles.loginBox + ' loginbox'}>
                    {/* 标题*/}
                    <div className={styles.title}>
                        <h1>基于Vite的后台管理系统</h1>
                        <p>版本：V1.0.0</p>
                    </div>
                    {/* 表单*/}
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

                    <Input placeholder={'用户名'} className={'ant-input'} onChange={usernameChange}></Input>
                    <Input.Password placeholder={'密码'} onChange={passwordChange}></Input.Password>

                    <div className="CaptchaBox">
                        <Input placeholder={'验证码'}  onChange={captchaChange}/>
                        <div className="CaptchaImg">
                            <img height={'38'} width={'100'} src="" alt=""/>
                        </div>
                    </div>

                    <Button className={'loginBtn'} type={'primary'} block onClick={gotoLogin}>Login</Button>
                    </Space>
                    </div>
            </div>
        );

}

export default Index;

