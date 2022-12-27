import React,{ReactNode} from 'react'

interface IRouter {
    title:string
    path:string
    commponent?:ReactNode
    children?:IRouter[]
}
const router:IRouter[] = []
export default router
