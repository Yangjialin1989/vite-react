import React, {useEffect, Component, ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
//antd 组件
import {Button, Input, Space, message, Checkbox, Form} from 'antd'

import styles from './login.module.scss'
import initLoginBg from './init'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './login.less'
import {CaptchaAPI, CaptchaRegistAPI, LoginAPI} from '@/request/api'
//import {CaptchaAPIRes} from "@/types/api";
import axios from 'axios'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';


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
        getCaptchaImg1()

    }, [])




    //let remembermeVal = any;

    // const onchangeCheckbox = (e:any) => {
    //     remembermeVal = e.target.checked
    //     console.log(remembermeVal)
    // }

    //获取用户登录信息
    //定义用户输入信息变量，一旦值改了，变量就改了，所以拿到usernameVal就拿到用户的输入信息
    const [usernameVal, setUsernameVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')
    const [captchaVal, setCaptchaVal] = useState('')

    //定义变量保存验证码图片信息
    const [captchaImg, setCaptchaImg] = useState('')
    const [captchaImg1, setCaptchaImg1] = useState('')
    let imgsvg = ''
    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsernameVal(e.target.value);
    }
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value);
    }
    const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value);
    }

    //登录事件函数
    const gotoLogin = async () => {
        //console.log('用户输入的信息',usernameVal,passwordVal,captchaVal)

        //1.验证是否有空值
        if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
            message.warning('请输入完整信息！')
            return
        }


        //2.不需要验证验证码，后端做 qdtest1 123456



        //3.发起请求
        let loginAPIRes = await LoginAPI({
            username: usernameVal,
            password: passwordVal,
            code: captchaVal,
            remember:true,
            uuid: localStorage.getItem('uuid') as string //as 断言一定是string类型
        })
        if (loginAPIRes.code === 200) {
            //提示登录成功
            message.success('登录成功！')
            //保存token
            localStorage.setItem('react-token', loginAPIRes.token)

            const expire = 1000 * 60 * 2;
            setTimeout(()=>{
                console.log('hhhh')
                localStorage.removeItem('react-token')
            },20000)

            //跳转到首页
            navigateTo('/page1')
            //删除uuid
            localStorage.removeItem('uuid')
        }else if (loginAPIRes.code === 100){
            message.warning(loginAPIRes.msg)
        }else if (loginAPIRes.code === 101){
            message.error(loginAPIRes.msg)
        }

        console.log(loginAPIRes)

    }
    //获取验证码函数
    const getCaptchaImg = async () => {
        let captchaAPIRes = await CaptchaAPI();
        console.log(captchaAPIRes);
        if (captchaAPIRes.code == 200) {
            //1.渲染图片
            //setCaptchaImg('data:image/gif;base64,'+captchaAPIRes.img)
            setCaptchaImg('data:image/svg+xml;utf8,' + captchaAPIRes.img)
            //setCaptchaImg(captchaAPIRes.img)
            document.getElementById('svg')!.innerHTML = captchaAPIRes.img
            document.getElementById('svgimg')!.innerHTML = captchaAPIRes.img
            //2.本地保存uuid，给登录的时候用
            localStorage.setItem('uuid', captchaAPIRes.uuid)
        }


    }
    //获取验证码函数
    const getCaptchaImg1 = async () => {
        let captchaAPIRes = await CaptchaAPI();
        if (captchaAPIRes.code == 200) {

            document.getElementById('svgimg')!.innerHTML = captchaAPIRes.img
            //2.本地保存uuid，给登录的时候用
            localStorage.setItem('uuid', captchaAPIRes.uuid)
        }


    }
    const gotoRegist = async ()=>{
        navigateTo('/register')
    }
    //登录事件函数
    const gotoLogin1 = async () => {
        //console.log('用户输入的信息',usernameVal,passwordVal,captchaVal)

        //1.验证是否有空值
        if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
            message.warning('请输入完整信息！')
            return
        }


        //2.不需要验证验证码，后端做 qdtest1 123456



        //3.发起请求
        let loginAPIRes = await LoginAPI({
            username: usernameVal,
            password: passwordVal,
            code: captchaVal,
            remember:true,
            uuid: localStorage.getItem('uuid') as string //as 断言一定是string类型
        })
        if (loginAPIRes.code === 200) {
            //提示登录成功
            message.success('登录成功！')
            //保存token
            localStorage.setItem('react-token', loginAPIRes.token)

            const expire = 1000 * 60 * 2;
            setTimeout(()=>{
                console.log('hhhh')
                localStorage.removeItem('react-token')
            },20000)

            //跳转到首页
            navigateTo('/page1')
            //删除uuid
            localStorage.removeItem('uuid')
        }else if (loginAPIRes.code === 100){
            message.warning(loginAPIRes.msg)
        }else if (loginAPIRes.code === 101){
            message.error(loginAPIRes.msg)
        }

        console.log(loginAPIRes)

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
                {/* 表单*/}
                {/*<Space direction="vertical" size="middle" style={{display: 'flex'}}>*/}

                {/*    <Input placeholder={'用户名'} className={'ant-input'} onChange={usernameChange}></Input>*/}
                {/*    <Input.Password placeholder={'密码'} onChange={passwordChange}></Input.Password>*/}

                {/*    <div className="CaptchaBox">*/}
                {/*        <Input placeholder={'验证码'} onChange={captchaChange}/>*/}
                {/*        <div className="CaptchaImg" onClick={getCaptchaImg}>*/}
                {/*            <div id={'svg'}>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <Checkbox   style={{color:'#1890ff'}}>记住我</Checkbox>*/}
                {/*    <Button className={'loginBtn'} type={'primary'} block onClick={gotoLogin}>Login</Button>*/}
                {/*</Space>*/}

                <Space  className={styles.space}>
                    <Form name="basic"
                          labelCol={{span:0}}
                          wrapperCol={{span:24}}
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off">
                        <Form.Item wrapperCol={{ offset: 2, span: 24 }}  name={'username'} rules={[{ required: true, message: '请输入用户名!' }]}>
                            <Input  placeholder={'用户名'} className={'ant-input'}  />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 22 }}  name={'password'} rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input.Password  placeholder={'密码'}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 22 }}  name={'captcha'} rules={[{ required: true, message: '请输入验证码!' }]}>
                            <Space className={'CaptchaBox'} direction={'horizontal'} >
                                <Input  placeholder={'验证码'} />
                                <div className={'CaptchaImg'}  style={{width:'100px'}}  onClick={getCaptchaImg1}>
                                    <div id={'svgimg'}></div>
                                </div>
                            </Space>

                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 22 }}  name="remember" valuePropName="checked">
                            <Checkbox  style={{color:'#1890ff'}}>记住我</Checkbox>
                            <Button  onClick={gotoRegist}  style={{color:'#fff'}} type={'link'}>注册</Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>


                    </Form>
                </Space>




            </div>
        </div>


    );

}

export default Index;

