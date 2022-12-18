//全局声明

//TS 提供ReturnType 用来获取函数类型的返回值
type RootState = ReturnType<typeof import('@/store').getState>
interface Window{
    __REDUX_DEVTOOLS_EXTENSION__:function
}


