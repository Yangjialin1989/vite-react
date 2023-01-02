import React, {Component, createRef, RefObject} from 'react';
import {Button, Form, FormInstance, Input, Modal,message} from "antd";
import {ValidUsernameAPI,AddAdminsAPI} from "@/request/api";
import {IAdmin} from "@/views/Admin/Admin";
//antd css
const layout = {
    labelCol:{span:4},
    wrapperCol:{span:18},
};
const tailLayout = {
    wrapperCol:{offset:8,span:16},
}


interface IProps{
    visible:boolean
    callback:(refresh?:boolean)=>void
}

class AddAdmin extends Component<IProps> {
    formRef:RefObject<FormInstance>
    constructor(props:IProps,context:any) {
        super(props,context);
        this.formRef=createRef<FormInstance>()
    }
    cancel =()=>{
        this.props.callback()
    }
    addAddmin=(admin:IAdmin)=>{
        let id=new Date().valueOf();
        console.log(typeof id)

        AddAdminsAPI({id:id,name:admin.name,password:admin.password,telephone:admin.telephone,email:admin.email}).then(response=>{
            const {code,msg} = response
            if(code === 200){
                message.success(msg)
                this.formRef.current?.resetFields()
                this.props.callback(true)
            }else {
                message.error('error!')
            }
        })
    }
    render() {
        return (
            <Modal
            title={'添加管理员'}
            visible={this.props.visible}
            onCancel={this.cancel}
            footer={null}
            >
                <Form
                   ref={this.formRef}
                   {...layout}
                    onFinish={this.addAddmin}
                >
                    <Form.Item name={'name'} label={'用户名'}  rules={[
                        { required: true, message: '请输入注册名!' },
                        {max:12,message:'用户名必须小于等于12位'},
                        {min:2,message:'用户名必须大于等于2位'},
                        //{pattern:/^\w+$/,message:'必须由数字、字母、下划线组成'},
                        ({ getFieldValue }) => ({
                            async validator(rule, value) {
                                let username = getFieldValue('name')
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
                     <Input/>
                    </Form.Item>
                    <Form.Item name={'password'} label={'密码'} rules={[{
                        type:'string',required:true,message:'密码不可以为空',
                        validator:(rule,value)=>{

                            if(value.length <6){
                                return Promise.reject('密码长度不可以小于6位')
                            }
                            return Promise.resolve()
                        }
                    }]}>
                     <Input.Password/>
                    </Form.Item>
                    <Form.Item name={'telephone'} label={'手机号'} rules={[{ required: true, message: '请输入电话!' },{
                        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号'
                    }]}>
                     <Input/>
                    </Form.Item>
                    <Form.Item   name={'email'} label={'邮箱'} rules={[
                        { required: true, message: '请输入邮箱!' },
                        {pattern:/^\w+[@][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)$/,message:'邮箱格式不正确'}]}>
                        <Input  />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type={'primary'}  htmlType={'submit'}>添加管理员</Button>
                        <Button type={'default'} htmlType={'reset'}>重置</Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}

export default AddAdmin;
