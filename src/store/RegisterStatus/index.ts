

const store =  {
    state:{
        flag1:false
    },
    actions:{
        flag(newState: { flag1: boolean }, action: { type: string, val: boolean }) {
            newState.flag1 = action.val
        }
    },
    //名字统一管理
    actionNames:{}

}
let actionNames = {}
for (let key in store.actions){
    actionNames[key] = key

}
store.actionNames = actionNames
export default store