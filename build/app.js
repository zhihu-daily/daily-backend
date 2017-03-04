const koa = require('koa'),
    routes = require('../controllers/control'),
    bodyParse = require('koa-bodyparser')(),
    staticFiles = require('../static/static-files'),
    templating = require('../views/templatings'),
    log = require('./log'),
    app = new koa();

const isProduction = process.env.NODE_ENV === 'production';//判断是否为生产环境 如果是就关闭缓存 如果不是就开启缓存

app.use(staticFiles('/static/', __dirname.replace('build', '') + '/static'));//表示处理请求地址以/static/resource开头的,接受请求后到真实，目录的static下找
app.use(log);
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));
app.use(bodyParse);
app.use(routes);
app.listen(9000);