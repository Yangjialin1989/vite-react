

const store =  {
    state:{
        sarr:[10,20,30]
    },
    actions:{
        sarrpush(newState:{sarr:number[]}, action:{type:string,val:number}){
            newState.sarr.push(action.val)
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