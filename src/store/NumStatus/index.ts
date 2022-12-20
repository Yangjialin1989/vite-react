const store = {
    //数据
    state: {
        num: 20
    },
    //同步方法
    actions: {
        add1(newState: { num: number }, action: { type: string }) {

            newState.num++


        },
        add2(newState: { num: number }, action: { type: string, val: number }) {
            newState.num += action.val
        }
    },
    //异步方法
    asyncActions: {
        asyncAdd1(dispatch: Function) {
            setTimeout(() => {
                dispatch({type: 'add1'})
            }, 1000)
        }
    },
    actionNames: {}
}

let actionNames = {}
for (let key in store.actions) {
    actionNames[key] = key

}
store.actionNames = actionNames

export default store