
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
//注册
//注册用户名验证
export const ValidUsernameAPI = (params:ValidUsernameAPIReq):Promise<ValidUsernameAPIRes> =>request.post('/users/validUsername',params)
//注册
export const RegisterAPI = (params:RegisterAPIReq):Promise<RegisterAPIRes> =>request.post('/users/register',params)
//发邮件
export const SendEmailAPI = (params:SendEmailAPIReq):Promise<SendEmailAPIRes> =>request.post('/users/sendemail',params)


//获取用户数据
export const GetAdminsAPI = (params:GetAdminsAPIReq):Promise<GetAdminsAPIRes> =>request.post('/users/getAdmins',params)





