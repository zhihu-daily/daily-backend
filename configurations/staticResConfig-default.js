const path = require('path'),
    mime = require('mime'),
    fs = require('mz/fs');
function staticFiles(url, dir) {
    return async(ctx, next) => {
        let rPath = ctx.request.path;       //请求路径 /aa/bb这种
        if (rPath.startsWith(url)) {        //判断请求路径是否以 传入参数url  开头
            let fp = path.join(dir, rPath);//把路径换算成真实路径
            if (await fs.exists(fp)) {      //如果该路径存在
                ctx.response.type = mime.lookup(rPath);   //响应头信息为该静态资源文件的mime类型
                ctx.response.body = await fs.readFile(fp);// 读取文件内容并赋值给response.body:
            } else {
                ctx.response.status = 404;                // 文件不存在:
            }
        } else {
          await next();                     // 不是指定前缀的URL，继续处理下一个middleware:
        }
    }

}
module.exports = staticFiles;