const nunjucks = require('nunjucks'),//模版引擎
    Path = require('path'),
    rootPath = require('../config').rootPath;
function createEnv(path, opts) {
    let autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建Nunjucks的env对象:
    let env = createEnv(path, opts);
    return async(ctx, next) => {
        // 给ctx绑定render函数:
        ctx.render = (view, model) => {
            // 把render()渲染后的内容赋值给response.body:                      Object.assign方法是讲此处传入的三个对象的属性全部拷贝到一个对象中
            ctx.response.body = env.render(Path.join(rootPath+'/views', view), Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };
        // 继续处理请求:
        await next();
    };
}
module.exports = templating;