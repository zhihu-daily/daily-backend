let my_log=async (ctx,next)=>{
    console.log(ctx.request.url);
    console.log(ctx.request.method);
    await next();
};
module.exports=my_log;