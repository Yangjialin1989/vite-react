//状态管理
import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import reduxThunk from 'redux-thunk'
import handleNum from './NumStatus/reducer'
import handleArr from './ArrStatus/reducer'
import handleFlag from './RegisterStatus/reducer'

//组合各个模块的reducer
const reducers = combineReducers({
    handleNum,
    handleArr,
    handleFlag
})


//创建数据仓库
//const store = legacy_createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose //rt
// 把仓库数据，浏览器redux-dev-tools，还有reduxThunk插件关联在store中
const store =
    legacy_createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk))); //rt

export default store

