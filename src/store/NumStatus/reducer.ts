//状态数据管理
//默认状态
//导入数据
import handleNum from './index'
let reducer = (state = {...handleNum},action:{type:string,val:number})=>{
    //调用dispatch就会执行这里的代码，action接收数据


    //深拷贝
    let newState = JSON.parse(JSON.stringify(state))


    switch (action.type){
        case handleNum.add1:
            handleNum.actions[handleNum.add1](newState,action)
            break
        case handleNum.add2:
            handleNum.actions[handleNum.add2](newState,action)
            break
        default:
            break
    }



    return newState
}
export default reducer