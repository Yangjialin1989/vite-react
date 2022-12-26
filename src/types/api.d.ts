//有返回值就要定义类型

//验证码响应类型约束
interface CaptchaAPIRes {
	msg: string;
	img: string;
	code: number;
	captchaEnabled: boolean;
	uuid: string;
}

//验证码返回验证约束
interface CaptchaRegistAPIRes{
	code:number;
	msg:string
}
//验证码前往验证约束
interface CaptchaRegistAPIReq{
	code:string;
}


//登录请求参数类型约束
interface LoginAPIReq{
	username:string;
	password:string;
	code:string;
	uuid:string;
}
//登录响应类型约束
interface LoginAPIRes{
	msg:string;
	code:number;
	token:string;
}

