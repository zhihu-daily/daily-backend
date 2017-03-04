const register = require('babel-core/register');
register({
    presets: ['stage-3']
});
require('./app'); //解析es7语法