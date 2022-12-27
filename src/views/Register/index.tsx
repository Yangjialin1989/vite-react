import React, {useEffect, Component, ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
//antd 组件
import {Button, Input, Space, message, Checkbox, Form} from 'antd'

import styles from './login.module.scss'
import initLoginBg from './init'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './login.less'
import {CaptchaAPI, CaptchaRegistAPI, LoginAPI, ValidUsernameAPI} from '@/request/api'
//import {CaptchaAPIRes} from "@/types/api";
import axios from 'axios'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';

const Index = () => {
    let navigateTo = useNavigate();
    //加载完组件之后渲染背景
    useEffect(() => {
        initLoginBg()
        //窗口改变，也进行初始化，自适应
        window.onresize = function () {
            initLoginBg()
        }
        //获取uuid
        //getCaptchaImg1()

    }, [])




    //返回登录页面
    const returnLogin = async ()=>{
        navigateTo('/login')
    }




    const onFinish = async (values: any) => {

        //3.发起请求
        let {username,password,captcha,remember} = values;
        let loginAPIRes = await LoginAPI({
            username: username,
            password: password,
            code: captcha,
            remember:remember,
            uuid: localStorage.getItem('uuid') as string //as 断言一定是string类型
        })
        if (loginAPIRes.code === 200) {
            //提示登录成功
            message.success('登录成功！')
            //保存token
            if(loginAPIRes.remember){
                localStorage.setItem('react-token', loginAPIRes.token)

                const expire = 1000 * 60 * 2;
                setTimeout(()=>{
                    console.log('hhhh')
                    localStorage.removeItem('react-token')
                },604800000)
            }else{
                localStorage.setItem('react-token', loginAPIRes.token)

                const expire = 1000 * 60 * 2;
                setTimeout(()=>{
                    console.log('hhhh')
                    localStorage.removeItem('react-token')
                },800000)
            }


            //跳转到首页
            navigateTo('/page1')
            //删除uuid
            localStorage.removeItem('uuid')
        }else if (loginAPIRes.code === 100){
            message.warning(loginAPIRes.msg)
        }else if (loginAPIRes.code === 101){
            message.error(loginAPIRes.msg)
        }
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validUsername = async (e:any) =>{
        let username = e.target.value
        if(username.trim() ===''){
            console.log('ok')
            message.warning('请输入有效注册名')
        }else{
            let validUsernameAPIRes = await ValidUsernameAPI({
                username:username
            })
            console.log(validUsernameAPIRes)
            if(validUsernameAPIRes.code === 300){

                message.success(validUsernameAPIRes.msg)
            }else if(validUsernameAPIRes.code === 102){
                message.error(validUsernameAPIRes.msg)
            }
        }

    }


    return (


        <div className={styles.loginPage}>
            { /* 存放背景*/}
            <canvas id={'canvas'} style={{display: 'block', opacity: '.8'}}></canvas>
            {/* 登录盒子*/}
            <div className={styles.loginBox + ' loginbox'}>
                {/* 标题*/}
                <div className={styles.title}>
                    <h1>基于Vite的后台管理系统</h1>
                    <p>版本：V1.0.0</p>
                </div>



                <Space  className={styles.space}>
                    <Form name="basic"
                          labelCol={{span:0}}
                          wrapperCol={{span:24}}
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off">
                        <Form.Item wrapperCol={{ offset: 2, span: 24 }}  name={'username'} rules={[{ required: true, message: '请输入注册名!' }]}>

                                <Input onBlur={validUsername} placeholder={'注册名'} className={'ant-input'}  />

                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 22 }}  name={'password'} rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input.Password id={'password'}  placeholder={'密码'}/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 2, span: 24 }}  name={'telephone'} rules={[{ required: true, message: '请输入电话!' }]}>
                            <Input  placeholder={'电话'} className={'ant-input'}  />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 24 }}  name={'email'} rules={[{ required: true, message: '请输入邮箱!' }]}>
                            <Input  placeholder={'邮箱'} className={'ant-input'}  />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                            <Button type={'link'} style={{color:'#fff'}} onClick={returnLogin}>已有账号，返回登录</Button>
                        </Form.Item>


                    </Form>
                </Space>




            </div>
        </div>


    );

}

export default Index;

