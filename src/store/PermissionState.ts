import {ReactNode} from "react";

export interface IRouter {
    id: string,
    exact?: boolean
    path: string
    title: string
    parentId?: number
    isMenu?: number
    component?: ReactNode
    routes?: IRouter[]
    redirect?: string
    icon?: ReactNode
}

export interface PermissionState {
    loading: boolean
    permissionList: IRouter[]
}