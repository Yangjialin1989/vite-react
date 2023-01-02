import {Menu, MenuProps} from "antd";
import React, {useState} from "react";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate,useLocation} from "react-router-dom";
/*
* useLocation获取当前跳转路径
* */

type MenuItem = Required<MenuProps>['items'][number];

//构建菜单数据
// function getItem(
//     label: React.ReactNode,
//     key: React.Key,
//     icon?: React.ReactNode,
//     children?: MenuItem[],
// ): MenuItem {
//     return {
//         key,
//         icon,
//         children,
//         label,
//     } as MenuItem;
// }
// const items: MenuItem[] = [
//     getItem('Option 1', '/page1', <PieChartOutlined />),
//     getItem('Option 2', '/page2', <DesktopOutlined />),
//     getItem('User', 'sub1', <UserOutlined />, [
//         getItem('Tom', '3'),
//         getItem('Bill', '4'),
//         getItem('Alex', '5'),
//     ]),
//     getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//     getItem('Files', '9', <FileOutlined />),
// ];
//登录请求数据，根items这个数组进行权限匹配，筛选出进行渲染
const items:MenuItem[]=[
    {
        label: '管理员管理',
        key: '/page1',
        icon:<TeamOutlined />,
    },
    {
        label: '权限管理',
        key: '/role',
        icon:<DesktopOutlined />,
    },
    {
        label: '栏目3',
        key: 'page3',
        icon:<UserOutlined />,
        children:[
            {
                label:'栏目3-1',
                key:'/page3/page301'
            },
            {
                label:'栏目3-2',
                key:'/page3/page302'
            }
        ]
    },
    {
        label: '栏目4',
        key: 'page4',
        icon:<TeamOutlined />,
        children:[
            {
                label:'栏目4-1',
                key:'/page4/page401'
            },
            {
                label:'栏目4-2',
                key:'/page4/page402'
            }
        ]
    }

]



const Comp: React.FC = ()=>{
    const navigateTo = useNavigate()
    const currentRoute = useLocation()
    //console.log(currentRoute)
    //函数
    const menuClick = (e:{key:string})=>{
        navigateTo(e.key)
        //点击跳转到对应的路由,通过key 指定路由的path路径，编程式导航跳转，利用一个hook
    }

    let firstOpenKey:string = ''
    //通过currentRoute.pathname当前选中的路径值与其他路由表中的children路径对比
    //
    function findKey(obj:{key:string}){
        return obj.key === currentRoute.pathname
    }
    for (let i=0;i<items.length;i++){
        //找到
        //判断有children且children不是空数组且找到内容
        // ! 肯定有这个属性的  as  断言
        if(items[i]!['children'] && items[i]!['children'].length>0 &&items[i]!['children'].find(findKey)){
           firstOpenKey =  items[i]!.key as string
           break
        }
        //items[i]['children'].find(findKey) //拿到对象就是true

    }


    //定义变量,决定openKeys展开的值 ，设定展开初始值，
    const [openKeys,setOpenKeys] = useState([firstOpenKey]);


    //展开和回收某项菜单的触发事件
    const handleOpenChange = (keys:string[])=>{
        //记录当前哪一项是展开的栏目
        //console.log(keys)
        //把数组修改成最后一项
        setOpenKeys([keys[keys.length -1]])
    }
    return (
        <Menu
            theme="dark"
            //当前选中项，值是key值
            defaultSelectedKeys={[currentRoute.pathname]}
            mode="inline"
            //菜单数据
            items={items}
            onClick={menuClick}
            ////记录当前哪一项是展开的栏目
            onOpenChange={handleOpenChange}
            //当前菜单展开项目的key数组
            openKeys={openKeys}
        />
    )

}
export default Comp

