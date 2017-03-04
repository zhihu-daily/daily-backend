let my_log=async (ctx,next)=>{  //打印请求日志
    console.log(ctx.request.url);
    console.log(ctx.request.method);
    await next();
};
module.exports=my_log;