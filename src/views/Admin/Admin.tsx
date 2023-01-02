import React, {Component, useEffect} from 'react';
import {Space, Table, Tag,Button} from 'antd';

import {GetAdminsAPI} from '@/request/api'
import initLoginBg from "@/views/Register/init";
import DeleteAdmin from "@/views/Admin/DeleteAdmin";
import AddAdmin from "@/views/Admin/AddAdmin";
export interface IAdmin {
    id: number
    name: string
    email: string
    telephone: string
    password:string
}

interface IState {
    adminList: IAdmin[]
    current:number
    pageSize:number
    total:number
    loading:boolean
    showAddAdminModal:boolean
}
//加载完组件之后渲染
class Admin extends Component<any, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            adminList: [],
            current:1,
            pageSize:15,
            total:0,
            loading:true,
            showAddAdminModal:false
        }
    }

    //function
    // getAdminList = async ()=>{
    //     let GetAdminsAPIRes = await GetAdminsAPI({})
    //     console.log(GetAdminsAPIRes)
    // }
    getAdminList = (limit:number)=>{
        //console.log('hhh')
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
    //删除子用户，同时移除数据列表。
    deleteAdmin=(id:number)=>{
        this.setState((state)=>({
            adminList:state.adminList.filter(admin=>admin.id!==id)
        }))
    }
    //添加管理员Modal,要状态提升，在IState中定义
    // 通过更改父组件state的值，修改了子组件的props的值，而操作子组件。
    showAddAdminModal = ()=>{
        this.setState({
            showAddAdminModal:true
        })
    }
    hideAddAdminModal =(refresh?:boolean)=>{
        if(refresh){
            this.getAdminList(1)
        }
        this.setState({
            showAddAdminModal:false
        })
    }
    render() {
        return (
            <>
                <Button type={'primary'} onClick={this.showAddAdminModal}>添加管理员</Button>
                <AddAdmin callback={this.hideAddAdminModal} visible={this.state.showAddAdminModal}></AddAdmin>
                <Table
                    loading={this.state.loading}
                    dataSource={this.state.adminList}
                    rowKey={'id'}
                    pagination={{position:['bottomCenter'],pageSize:this.state.pageSize,defaultCurrent:1}}
                    onChange={this.change}
                >
                    <Table.Column title={'ID'} dataIndex={'id'}/>
                    <Table.Column title={'姓名'} dataIndex={'name'}/>
                    <Table.Column title={'电话'} dataIndex={'telephone'}/>
                    <Table.Column title={'邮箱'} dataIndex={'email'}/>
                    <Table.Column title={'操作'} render={(admin:IAdmin)=>(<Space>
                        <Button type={'primary'}>编辑</Button>

                        <DeleteAdmin id={admin.id} deleteAdmin={this.deleteAdmin}/>
                    </Space>)}></Table.Column>
                </Table>
            </>
        );
    }


}

export default Admin;