import React, {useEffect, Component, ChangeEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
//antd 组件
import {Button, Input, Space,message} from 'antd'

import styles from './login.module.scss'
import initLoginBg from './init'

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './login.less'
import {CaptchaAPI,LoginAPI} from '@/request/api'
//import {CaptchaAPIRes} from "@/types/api";


const Index = ()=> {
    let navigateTo = useNavigate();
    //加载完组件之后渲染背景
    useEffect(()=>{
        initLoginBg()
        //窗口改变，也进行初始化，自适应
        window.onresize = function(){initLoginBg()}
        //获取uuid
        getCaptchaImg()

    },[])
    //获取用户登录信息
    //定义用户输入信息变量，一旦值改了，变量就改了，所以拿到usernameVal就拿到用户的输入信息
    const [usernameVal,setUsernameVal] =useState('')
    const [passwordVal,setPasswordVal] =useState('')
    const [captchaVal,setCaptchaVal] =useState('')

    //定义变量保存验证码图片信息
    const [captchaImg,setCaptchaImg] = useState('')

    const usernameChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUsernameVal(e.target.value);
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value);
    }
    const captchaChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value);
    }
    //登录事件函数
    const gotoLogin = async() => {
        //console.log('用户输入的信息',usernameVal,passwordVal,captchaVal)

        //1.验证是否有空值
        if(!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()){
            message.warning('请输入完整信息！')
            return
        }
        //2.不需要验证验证码，后端做 qdtest1 123456
        //3.发起请求
        let loginAPIRes = await LoginAPI({
            username:usernameVal,
            password:passwordVal,
            code:captchaVal,
            uuid:localStorage.getItem('uuid') as string //as 断言一定是string类型
        })
        if(loginAPIRes.code === 200){
            //提示登录成功
            message.success('登录成功！')
            //保存token
            localStorage.setItem('react-token',loginAPIRes.token)
            //跳转到首页
            navigateTo('/page1')
            //删除uuid
            localStorage.removeItem('uuid')
        }

        console.log(loginAPIRes)

    }
    //获取验证码函数
    const getCaptchaImg = async () =>{
        let captchaAPIRes = await CaptchaAPI();
        console.log(captchaAPIRes);
        if(captchaAPIRes.code == 200){
            //1.渲染图片
            setCaptchaImg('data:image/gif;base64,'+captchaAPIRes.img)

            //2.本地保存uuid，给登录的时候用
            localStorage.setItem('uuid',captchaAPIRes.uuid)
        }


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
                        <div className="CaptchaImg" onClick={getCaptchaImg}>
                            <img height={'38'} width={'100'} src={captchaImg} alt=""/>
                        </div>
                    </div>

                    <Button className={'loginBtn'} type={'primary'} block onClick={gotoLogin}>Login</Button>
                    </Space>
                    </div>
            </div>
        );

}

export default Index;

