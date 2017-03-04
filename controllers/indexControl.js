// const model = require('../models/sequelizeDB/model');
// let Pet = model.Pet,
//     User = model.User;
let index = async(ctx, next) => {
        ctx.render('/index.html', {
            title: 'hello',
            welcome:"welcome"
        });
    },
    home = async(ctx, next) => {
        ctx.response.type = 'text/html';
        let name = ctx.query.name;   //get请求在params中   post请求在ctx.body中请求体中
        console.log(name);
        // let pet = await Pet.create({ //创建实体类
        //     id: 'd-' + 123,
        //     name: 'Odie',
        //     gender: false,
        //     birth: '2008-08-08',
        //     createdAt: 123,
        //     updatedAt: 123,
        //     version: 0});
        // console.log(pet);
        ctx.response.body = `<h1>home ${name}</h1>`;
    };
module.exports = {
    'GET /': index,
    'GET /home': home
};