const db = require('./db/sequelizeDB');

let Pet = db.defineModel('pet', {
    id: {
        type: db.STRING(50),
        primaryKey: true
    },
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
    createdAt: db.BIGINT,
    updatedAt: db.BIGINT,
    version: db.BIGINT

}, {
    timestamps: false
});

module.exports = Pet;