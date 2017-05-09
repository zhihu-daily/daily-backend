const fs = require('fs'),
    rootPath=require('../../config').rootPath,
    path =require('path');
    db = require('./sequelizeDB');

let files = fs.readdirSync(path.join(rootPath,'/models'));//扫描models下的实体类

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

for (let f of js_files) {
    let name = f.replace('.js','');
    module.exports[name] = require(path.join(rootPath,'/models/') + f); //读取相应的实体类 并作为属性输出
    console.log(f.replace('.js','')); //打印所扫描到的实体类
}

module.exports.sync = () => {
    db.sync();
};



