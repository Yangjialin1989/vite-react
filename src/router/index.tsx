/*
* lazy ,需要添加loading组件React.Suspense
*
* */

//lazy 懒加载函数
import React,{lazy} from 'react'

import {Navigate} from "react-router-dom";

const About = lazy(()=>import('@/views/About'))
const Users = lazy(()=>import('@/views/Admin/Admin'))
const Page2 = lazy(()=>import('@/views/Page2'))
import Home from "@/views/Home";
import Page301 from "@/views/Page301";
import Login from "@/views/Login";
import Register from "@/views/Register";
import RoleList from "@/views/Role/RoleList";


const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

// const routes = [
//     {
//         path:'/',
//         element:<Navigate to={'/home'}/>
//     },
//     {
//         path:'/home',
//         element: <Home/>
//     },
//     {
//         path:'/about',
//         element: withLoadingComponent(<About/>)
//     }
// ]
const routes = [
    {
        path:'/',
        //Navigate to={} 重定向
        element:<Navigate to={'/page1'}/>,
        key:'1'
    },
    {
        path:'/',
        element: <Home/>,
        key:'2',
        children:[
            {
                path:'/page1',
                element:withLoadingComponent(<Users/>),
                key:'2-1'
            },
            {
                path:'/role',
                element:withLoadingComponent(<RoleList/>),
                key:'2-2'
            },
            {
                path:'/page3/page301',
                element:withLoadingComponent(<Page301/>),
                key:'2-3'
            }
        ]
    },
    {
      path:'/login',
      element: <Login/>,
      key:'3'
    },
    {
      path:'/register',
      element: <Register/>,
      key:'4'
    },
    //访问其余路径直接跳转到首页
    {
        path:'*',
        element:<Navigate to={'/page1'}/>,
        key:'1000000'

    }

]

export default routes
