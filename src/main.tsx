import React from 'react'
import ReactDOM from 'react-dom/client'

//初始化css
import 'reset-css'

//UI css

//全局css
import '@/assets/styles/global.sass'


//组件css
import App from './App'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
