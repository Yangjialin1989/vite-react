import { useState } from 'react'

import {Button} from 'antd';
import React from 'react';
import {UpCircleOutlined} from "@ant-design/icons";
//展示路由组件
import {useRoutes,Link} from 'react-router-dom'
import router from './router'
/*
* Outlet 路由组件展示
* Link 标签组件展示
* Navigate 路由重定项
*useRoutes(router) 解析路由列表 创建路由对象
*
*
*
* */
function App() {
  const [count, setCount] = useState(0)
    let outlet = useRoutes(router);
  return (
    <div className="App">

        {outlet}
    </div>
  )
}

export default App
