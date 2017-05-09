const Sequelize = require('sequelize'),
      config = require('../../configurations/dbConfig-default');

console.log('init sequelize...');
let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    'define': {
        // 字段以下划线（_）来分割（默认是驼峰命名风格）
        'underscored': true
    },
    dialectOptions: {
        charset: 'utf8mb4'
    },
    pool: {             //连接池配置
        max: 10,
        min: 0,
        idle: 30000
    }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {  //统一限定module格式
    let attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {

                } else {

                }
            }
        }
    });
}
Sequelize.defineModel = defineModel;
module.exports = Sequelize;