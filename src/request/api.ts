
import request from './index'
//import {CaptchaAPIRes} from "@/types/api";

//验证码请求
//请求参数和返回值类型都需要约束
//export const CaptchaAPI = () =>request.get('/prod-api/captchaImage')
//export const CaptchaAPI = ():Promise<CaptchaAPIRes> =>request.get('/prod-api/captchaImage')
export const CaptchaAPI = ():Promise<CaptchaAPIRes> =>request.get('/captcha/getInfo')
export const CaptchaRegistAPI = (params:CaptchaRegistAPIReq):Promise<CaptchaRegistAPIRes> =>request.post('/captcha/regist')

//登录请求
export const LoginAPI = (params:LoginAPIReq):Promise<LoginAPIRes> =>request.post('/users/login',params)





