const path = require('path'),
    mime = require('mime'),
    fs = require('mz/fs');
function staticFiles(url, dir) {
    return async(ctx, next) => {
        let rPath = ctx.request.path;//请求路劲 /aa/bb这种
        if (rPath.startsWith(url)) {//判断请求路径是否一static开头
            let fp = path.join(dir, 'resource', rPath.substring(url.length));//把路径换成真实路径
            if (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(rPath);
                // 读取文件内容并赋值给response.body:
                ctx.response.body = await fs.readFile(fp);
            } else {
                // 文件不存在:
                ctx.response.status = 404;
            }
        } else {
            // 不是指定前缀的URL，继续处理下一个middleware:
          await next();
        }
    }

}
module.exports = staticFiles;