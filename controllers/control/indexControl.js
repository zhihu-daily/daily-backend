const model = require('../../models/db/model');
let
    Pet = model.Pet,
    User = model.User;
let index = async(ctx, next) => {
        ctx.render('/login.html', {
            title: 'hello',
            "base.html":"/base.html"
        });
    },
    home = async(ctx, next) => {
        ctx.response.type = 'text/html';
        let name = ctx.request.body.name;
        let pet = await Pet.create({
            id: 'd-' + 123,
            name: 'Odie',
            gender: false,
            birth: '2008-08-08',
            createdAt: 123,
            updatedAt: 123,
            version: 0});
        console.log(pet);
        ctx.response.body = `<h1>home ${name}</h1>`;
    };
module.exports = {
    'GET /': index,
    'POST /home': home
};