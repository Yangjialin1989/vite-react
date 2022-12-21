import React from 'react'
import ReactDOM from 'react-dom/client'

//初始化css
import 'reset-css'

//UI css

//全局css
import '@/assets/styles/global.sass'
//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

//组件css

import App from './App'

import {BrowserRouter} from 'react-router-dom'

//状态管理

import {Provider} from "react-redux";
import store from "@/store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>

      <BrowserRouter>
          <App />
      </BrowserRouter>

  </Provider>
)
