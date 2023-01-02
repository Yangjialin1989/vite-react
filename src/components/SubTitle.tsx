import React, {Component, ReactNode} from 'react';
import {Breadcrumb} from "antd";
import {IRouter} from '../store/PermissionState'



//面包屑导航
class SubTitle extends Component {

    render(){
        return (
            <>
                <Breadcrumb style={{fontSize:'20px',color:'blue',backgroundColor:'#fff'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                
            </>
        );
    }
}

export default SubTitle;