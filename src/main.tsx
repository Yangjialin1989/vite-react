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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>

  </React.StrictMode>,
)
