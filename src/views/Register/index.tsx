import React, {useEffect, Component, ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
//antd 组件
import {Button, Input, Space, message, Checkbox, Form} from 'antd'

import styles from './login.module.scss'
import initLoginBg from './init'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './login.less'
import {RegisterAPI,SendEmailAPI, ValidUsernameAPI} from '@/request/api'
//import {CaptchaAPIRes} from "@/types/api";
import axios from 'axios'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import RegisterStatus from "@/store/RegisterStatus";
import {useSelector,useDispatch} from "react-redux";

const Index = () => {
    const dispatch = useDispatch()
    let {flag1} = useSelector((state:RootState)=>({
        flag1:state.handleFlag.flag1,

    }))
    const changeFlag = (flag:boolean) =>{
        dispatch({type:'flag',val:flag})

    }
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
        let {username,password,telephone,email} = values;
        let RegisterAPIRes = await RegisterAPI({
            name: username,
            password: password,
            telephone: telephone,
            email:email
        })
        if (RegisterAPIRes.code === 200) {
            //提示登录成功
            message.success(RegisterAPIRes.msg)
            //发送邮件
            let SendEmailAPIRes = await SendEmailAPI({
                email:RegisterAPIRes.email,
                name:RegisterAPIRes.name
            })




            //跳转到登录
            navigateTo('/login')

        }
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validUsername = async (e:any) =>{
        let username = e.target.value
        if(username.trim() ===''){

            message.warning('请输入有效注册名')
            changeFlag(true)
            console.log(flag1)

        }else{
            let validUsernameAPIRes = await ValidUsernameAPI({
                username:username
            })
            console.log(validUsernameAPIRes)
            if(validUsernameAPIRes.code === 300){

                message.success(validUsernameAPIRes.msg)
                changeFlag(false)



            }else if(validUsernameAPIRes.code === 102){
                message.error(validUsernameAPIRes.msg)
                changeFlag(true)
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
                        <Form.Item wrapperCol={{ offset: 2, span: 24 }}  name={'username'}
                                   rules={[
                                       { required: true, message: '请输入注册名!' },
                                       {max:12,message:'用户名必须小于等于12位'},
                                       {min:2,message:'用户名必须大于等于2位'},
                                       //{pattern:/^\w+$/,message:'必须由数字、字母、下划线组成'},
                                        ({ getFieldValue }) => ({
                                           async validator(rule, value) {
                                               let username = getFieldValue('username')
                                               let validUsernameAPIRes =await ValidUsernameAPI({
                                                   username:username
                                               })
                                               console.log('------------------'+validUsernameAPIRes.msg)
                                               if(validUsernameAPIRes.code === 300){

                                                   //message.success(validUsernameAPIRes.msg)
                                                   return Promise.resolve()



                                               }else if(validUsernameAPIRes.code === 102){
                                                   return Promise.reject(validUsernameAPIRes.msg)
                                               }

                                           },
                                       })
                                   ]}>

                                {/*<Input onBlur={validUsername} placeholder={'注册名'} className={'ant-input'}  />*/}
                                <Input placeholder={'注册名'} className={'ant-input'}  />

                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 22 }}  name={'password'} rules={[
                            { required: true, message: '请输入密码!' },{
                            pattern:
                                /^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$/,
                            message: "8-16位字符，必须包括字母和数字",
                        }]}>
                            <Input.Password id={'password'}  placeholder={'密码'}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 22 }} dependencies={['password']} name={'password1'} rules={[({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('新密码与确认新密码不同！');
                            },
                        }),]}>
                            <Input.Password id={'password'}  placeholder={'密码'}/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 2, span: 24 }}  name={'telephone'} rules={[
                            { required: true, message: '请输入电话!' },{
                                pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号'
                            }]}>
                            <Input   placeholder={'电话'} className={'ant-input'}  />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 24 }}  name={'email'} rules={[
                            { required: true, message: '请输入邮箱!' },
                            {pattern:/^\w+[@][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)$/,message:'邮箱格式不正确'}]}>
                            <Input  placeholder={'邮箱'} className={'ant-input'}  />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button disabled={flag1} type="primary" htmlType="submit">
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

