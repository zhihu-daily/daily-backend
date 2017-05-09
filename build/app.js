const koa = require('koa'),
    rootPath=require('../config').rootPath,                                     //真实根目录路径
    path=require('path'),
    routes = require(path.join(rootPath,'configurations/controlConfig-default')),//control配置
    bodyParser = require('koa-bodyparser')(),                                           //解析请求体数据
    staticFiles = require(path.join(rootPath,'configurations/staticResConfig-default')),            //静态资源处理配置（发布到服务器上时不用）
    templating = require(path.join(rootPath,'configurations/templateConfig-default')),               //模板配置
    log = require(path.join(rootPath,'build/log')),                              //日志配置
    app = new koa();

const isProduction = process.env.NODE_ENV === 'production';                             //判断是否为生产环境 如果是就关闭缓存 如果不是就开启缓存
app.use(staticFiles('/static/',rootPath));              //表示处理请求地址以/static/resource开头的,接受请求后到真实，目录的static下找
app.use(log);                                           //添加日志模版
app.use(templating('view', {                            //添加模版引擎 render方法
    noCache: !isProduction,
    watch: !isProduction
}));
app.use(bodyParser);                                    //添加请求体解析
app.use(routes);                                        //解析所有路由请求
app.listen(9913);                                       //监听端口