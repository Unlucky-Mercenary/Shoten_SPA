var ejs = require('ejs');

exports.template = function (posts, res, template) {

    //console.log(posts);
    var data = ejs.render(template, {
        posts
    });

    res.writeHead(200, { 'content-Type': 'text/html' });
    res.write(data);

    // 処理終了メソッド
    res.end();
}

exports.a_template = function (res,template) {

    //console.log(posts);
    var data = ejs.render(template);

    res.writeHead(200, { 'content-Type': 'text/html' });
    res.write(data);

    // 処理終了メソッド
    res.end();
}


exports.p_template = function (name, posts, orders, date, dates,unpaid_sum,checks,res,template) {

    //console.log(posts);
    var sum = 0;
    for (i = 0; i < orders.length;i++){
        sum += orders[i].price;
    }

    var data = ejs.render(template, {
        guest: name,
        sum: sum,
        posts,
        orders,
        date: date,
        dates: dates,
        unpaid_sum: unpaid_sum,
        checks:checks
    });
    res.writeHead(200, { 'content-Type': 'text/html' });
    res.write(data);
   

    // 処理終了メソッド
    res.end();
}

exports.f_template = function (name, price,orders,res, template) {

    //console.log(posts);
    var sum = 0;
    for (i = 0; i < orders.length; i++) {
        sum += orders[i].price;
    }

    var data = ejs.render(template, {
        guest: name,
        sum: sum,
        price:price,
        orders
    });
    res.writeHead(200, { 'content-Type': 'text/html' });
    res.write(data);


    // 処理終了メソッド
    res.end();
}