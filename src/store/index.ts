//状态管理
import {combineReducers, legacy_createStore} from "redux";
import handleNum from './NumStatus/reducer'
import handleArr from './ArrStatus/reducer'

//组合各个模块的reducer
const reducers = combineReducers({
    handleNum,
    handleArr
})


//创建数据仓库
const store = legacy_createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//const store = legacy_createStore(reducer)

export default store

