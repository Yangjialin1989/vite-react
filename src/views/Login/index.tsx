import React, {useEffect,Component} from 'react';

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

                    <Input placeholder={'用户名'} className={'ant-input'}></Input>
                    <Input.Password placeholder={'密码'}></Input.Password>
                    <Button type={'primary'} block>Login</Button>
                    </Space>
                    </div>
            </div>
        );

}

export default Index;

