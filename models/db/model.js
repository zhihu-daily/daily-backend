const fs = require('fs');
const db = require('./sequelizeDB');

let files = fs.readdirSync(__dirname.replace('db',''));

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.replace('.js','');
    module.exports[name] = require(__dirname.replace('db','') + f);
    console.log(f.replace('.js',''));
}

module.exports.sync = () => {
    db.sync();
};