const model = require('../models/sequelizeDB/model');
const dataFormatter = require('../utils/dateTimeFormatter');
//因为此处route是middleware的最后一个链 后面没有异步函数了 所以不需要在await next()去执行后面的异步函数 但是 此处必须是异步函数
//不然上一个middleware不会执行这个函数
let index = async(ctx, next) => {
        ctx.render('/index.html', {
            title: 'hello',
            welcome:"welcome"
        });
    },main=async(ctx, next) => {
        ctx.render('/main.html', {
            title: 'hello',
            welcome:"welcome"
        });
    },manage=async(ctx, next) => {
        ctx.render('/manage.html', {
            title: 'hello',
            welcome:"welcome"
        });
    },report=async(ctx, next) => {
        ctx.render('/report.html', {
            title: 'hello',
            welcome:"welcome"
        });
    },
    home = async(ctx, next) => {
        ctx.response.type = 'text/html';
        let name = ctx.query.name;   //get请求在params中   post请求在ctx.body中请求体中
        console.log(name);
        const Goods=model.Goods;
        const User=model.User;
        let goods = await Goods.create({ //创建实体类
            id: 'd-' + 111121131,
            name: `aaa啊`,
            count: 123,
            last_handle_human: "vijay",
            last_handle_time:dataFormatter(new Date().getTime())});
        console.log(goods);
        let user = await User.create({ //创建实体类
            id: 'd-' + 111231,
            name: `vijay`,
            jurisdiction: "B",
            account: 123146,
            password: `wodasd`});
        console.log(user);
        ctx.response.body = `<h1>home ${name}</h1>`;
    },
    keywords=async(ctx, next) => {
        ctx.response.type = 'text/html';
        ctx.response.body =JSON.stringify([
            "张三",
            "李四",
            "王五",
            "王五",
            "五王",
            "五王",
            "五王",
            "五王",
            "五王",
            "赵六",
            "孙七",
            "周七",
            "王杰"
        ]);
    }
    ;
module.exports = {
    'GET /': index,
    'GET /main': main,
    'GET /manage': manage,
    'GET /report': report,
    'GET /home': home,
    'GET /JSON/keywords': keywords
};