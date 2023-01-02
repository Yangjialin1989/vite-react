import React, {Component} from 'react';
import {Button, message, Popconfirm} from "antd";
import {DeleteAdminsAPI} from '@/request/api'

interface IProps{
    id:number
    deleteAdmin:(id:number)=>void //void 不想返回任何
}

class DeleteAdmin extends Component<IProps> {
    deleteAdmin=()=>{
        DeleteAdminsAPI({id:this.props.id}).then(response=>{
            const {code,msg} = response
            if(code === 0){
                message.success(msg)
                this.props.deleteAdmin(this.props.id)
            }else {
                message.error(msg)
            }
        })
    }
    cancel=()=>{
        message.info('取消删除！')
    }
    render() {
        return (
            <Popconfirm
                title={'删除管理员'}
                onConfirm={this.deleteAdmin}
                onCancel={this.cancel}

            >
                <Button type={'primary'} danger>删除</Button>

            </Popconfirm>
        );
    }
}

export default DeleteAdmin;