//状态数据管理
//默认状态
//导入数据
import handleArr from "./index";

let reducer = (state = {...handleArr},action:{type:string,val:number})=>{
    //调用dispatch就会执行这里的代码，action接收数据


    //深拷贝
    let newState = JSON.parse(JSON.stringify(state))


    switch (action.type){
        case handleArr.sarrpush:
            handleArr.actions[handleArr.sarrpush](newState,action)
            break
        default:
            break
    }



    return newState
}
export default reducer