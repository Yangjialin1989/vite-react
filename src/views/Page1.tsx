import React, {Component} from 'react';

import {useSelector,useDispatch} from 'react-redux'
const Page1 =()=> {
    /********对数字进行操作***************************************************/
    //修改数据
    const dispatch = useDispatch()
    //获取数据
    const {num} = useSelector((state:RootState)=>({
        num:state.handleNum.num
    }))

    const changeNum = () =>{
        //dispatch({type:'string',value})
        dispatch({type:'add2',val:10})
    }

    /*******对数组进行操作******************************************************/
    const {sarr} = useSelector((state:RootState)=>({
        sarr:state.handleArr.sarr
    }))

    const changeArr = () => {
      dispatch({type:'sarrpush',val:100})
    }

    return (
            <div>
                Page1

                <button onClick={changeNum}>按钮</button>
                <p>{num}</p>
                <p>{sarr}</p>
                <button onClick={changeArr}>按钮1</button>
           </div>
    );

}

export default Page1;