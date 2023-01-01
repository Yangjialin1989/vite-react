import React, {Component, useEffect} from 'react';
import {Space, Table, Tag,Button} from 'antd';

import {GetAdminsAPI} from '@/request/api'
import initLoginBg from "@/views/Register/init";
interface IAdmin {
    id: number
    name: string
    email: string
    telephone: string
}

interface IState {
    adminList: IAdmin[]
    current:number
    pageSize:number
    total:number
    loading:boolean
}
//加载完组件之后渲染
class Users extends Component<any, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            adminList: [],
            current:1,
            pageSize:15,
            total:0,
            loading:true
        }
    }

    //function
    // getAdminList = async ()=>{
    //     let GetAdminsAPIRes = await GetAdminsAPI({})
    //     console.log(GetAdminsAPIRes)
    // }
    getAdminList = (limit:number)=>{
        console.log('hhh')
        GetAdminsAPI({limit:limit}).then(response=>{
            const data = response.data
            console.log(data)
            this.setState({
                adminList:data,
                loading:false
            })
        })
    }
    //组件加载完成后调用
    componentDidMount() {
        this.getAdminList(1)
    }
    change=(pagination:any)=>{
        this.getAdminList(pagination.current)
    }
    render() {
        return (
            <>
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.adminList}
                    rowKey={'key'}
                    pagination={{position:['bottomCenter'],pageSize:this.state.pageSize,defaultCurrent:1}}
                    onChange={this.change}
                >
                    <Table.Column title={'ID'} dataIndex={'id'}/>
                    <Table.Column title={'姓名'} dataIndex={'name'}/>
                    <Table.Column title={'电话'} dataIndex={'telephone'}/>
                    <Table.Column title={'邮箱'} dataIndex={'email'}/>
                    <Table.Column title={'操作'} render={()=>(<Space>
                        <Button type={'primary'}>编辑</Button>
                        <Button type={'primary' } danger>删除</Button>
                    </Space>)}></Table.Column>
                </Table>
            </>
        );
    }


}

export default Users;