const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(createProxyMiddleware('/api/sliderApi',
        {
            target: "http://127.0.0.1:5000/",
            changeOrigin:true,
            pathRewrite: {
                "^/api": "/"
            },
            "secure":true  //如果访问的是https类的链接，就需要设置为true 3.访问数据的时候用“/api”前缀
        }))
}