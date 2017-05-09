const db = require('./sequelizeDB/sequelizeDB');

let Goods = db.defineModel('goods_info', {
    id: {
        type: db.STRING(50),
        primaryKey: true
    },
    name: db.CHAR(10),
    count: db.STRING(100),
    last_handle_human: db.STRING(50),
    last_handle_time: db.STRING(50)
}, {
    timestamps: false
});

module.exports = Goods;