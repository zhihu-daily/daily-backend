const fs = require('fs'),
    config=require('../config');
    router = require('koa-router')();

function addController(router) {        //扫描controllers包下的所有文件
    let files = fs.readdirSync(config.rootPath + '/controllers');
    files = files.filter((file) => {
        return file.endsWith('.js')
    });
    for (let file of files) {
        let controller = require(config.rootPath + '/controllers/' + file);
        addMapping(router, controller);  //将所有文件添加相对应的映射
    }
    return router.routes();              //返回添加好映射的routes
}

function addMapping(router, controller) {
    for (let method in controller) {
        if (method.startsWith('GET')) {             //如果是以GET开头
            let url = method.substring(4);          //切割出所对应的url
            router.get(url, controller[method]);    //加入到koa的路由管理中
        } else if (method.startsWith('POST')) {     //如果是以POST开头的
            let url = method.substring(5);          //切割出对应的urls
            router.post(url, controller[method]);   //加入到koa的路由管理中
        } else {
            console.log('this method is not support!');
        }
    }
}

module.exports = addController(router);