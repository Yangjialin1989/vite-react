//状态数据管理
//默认状态
//导入数据
import handler from "./";


let reducer = (state = {...handler.state},action:{type:string})=>{
    //调用dispatch就会执行这里的代码，action接收数据


    //深拷贝
    let newState = JSON.parse(JSON.stringify(state))
    //console.log(newState)
    //
    // switch (action.type){
    //     case handler.sarrpush:
    //         handler.actions[handler.sarrpush](newState,action)
    //         break;
    //     default:
    //         break;
    // }
    for (let key in handler.actionNames){
        //判断是否相等 key 是键，
        if(action.type === handler.actionNames[key]){
            handler.actions[handler.actionNames[key]](newState,action);
            break;
        }

    }


    return newState
}
export default reducer