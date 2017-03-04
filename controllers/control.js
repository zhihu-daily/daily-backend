const fs = require('fs'),
    router = require('koa-router')();

function addController(router) {
    let files = fs.readdirSync(__dirname + '/control');
    files = files.filter((file) => {
        return file.endsWith('.js')
    });
    for (let file of files) {
        let controller = require(__dirname + '/control/' + file);
        addMapping(router, controller);
    }
    return router.routes();
}

function addMapping(router, controller) {
    for (let method in controller) {
        if (method.startsWith('GET')) {
            let mapping = method.substring(4);
            router.get(mapping, controller[method]);
        } else if (method.startsWith('POST')) {
            let mapping = method.substring(5);
            router.post(mapping, controller[method]);
        } else {
            console.log('this method is not support!');
        }
    }
}

module.exports = addController(router);