/*
* lazy ,需要添加loading组件React.Suspense
*
* */

//lazy 懒加载函数
import React,{lazy} from 'react'

import {Navigate} from "react-router-dom";

const About = lazy(()=>import('@/views/About'))
const Page1 = lazy(()=>import('@/views/Page1'))
const Page2 = lazy(()=>import('@/views/Page2'))
import Home from "@/views/Home";
import Page301 from "@/views/Page301";
import Login from "@/views/Login";


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
        element:<Navigate to={'/page1'}/>
    },
    {
        path:'/',
        element: <Home/>,
        children:[
            {
                path:'/page1',
                element:withLoadingComponent(<Page1/>)
            },
            {
                path:'/page2',
                element:withLoadingComponent(<Page2/>)
            },
            {
                path:'/page3/page301',
                element:withLoadingComponent(<Page301/>)
            }
        ]
    },
    {
      path:'/login',
      element: <Login/>
    },
    //访问其余路径直接跳转到首页
    {
        path:'*',
        element:<Navigate to={'/page1'}/>

    }

]

export default routes
