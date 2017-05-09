const db = require('./sequelizeDB/sequelizeDB');


module.exports = db.defineModel('user', {
    id: {
        type: db.STRING(100),
        primaryKey: true
    },
    name: db.STRING(100),
    jurisdiction: db.STRING(100),
    account: db.STRING(100),
    password: db.STRING(100)
});