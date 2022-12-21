import React, {Component} from 'react';

import {useSelector,useDispatch} from 'react-redux'
import numStatus from "@/store/NumStatus";
const Page1 =()=> {
    //修改数据
    const dispatch = useDispatch()
    //获取数据
    const {num,sarr} = useSelector((state:RootState)=>({
        num:state.handleNum.num,
        sarr:state.handleArr.sarr
    }))

    const changeNum = () =>{
          dispatch({type:'add2',val:10})
    }
    const changeNum2 = () =>{
        dispatch(numStatus.asyncActions.asyncAdd1)

    }
    const changeArr = () => {
      dispatch({type:'sarrpush',val:100})
    }
    return (
            <div>
                Page1

                <button onClick={changeNum}>同步按钮</button>
                <button onClick={changeNum2}>异步按钮</button>
                <p>{num}</p>
                <p>{sarr}</p>
                <button onClick={changeArr}>按钮1</button>
           </div>
    );

}

export default Page1;