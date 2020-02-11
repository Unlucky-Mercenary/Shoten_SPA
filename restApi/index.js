var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');
var config = require('./common/config');
var db=require('./common/db')
var server = http.createServer();
var render_form = require('./common/render_form');
var session = require('express-session');
var express = require('express');
var moment = require('moment');

var msg;
var posts = [];
//var index_template = fs.readFileSync(__dirname + '/lab_member/template/all_member.ejs', 'utf-8');
//var admin_template = fs.readFileSync(__dirname + '/admin/template/admin.ejs', 'utf-8');
//var price_template = fs.readFileSync(__dirname + '/price/template/select_price.ejs', 'utf-8');
//var finish_template = fs.readFileSync(__dirname + '/price/template/finish.ejs', 'utf-8');
//var order_error_template = fs.readFileSync(__dirname + '/price/template/order_error.ejs', 'utf-8');
var app = express();
var member_id=[];
app.listen(config.port,config.ip);

app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxage: 1000 * 60 * 5
    }
})); 


//READ
//値段を参照するAPI
app.get('/api/prices', (req, res) => {
    var members = [];
    db.get_prices(function (price) {
        //console.log(members);
        res.header("Content-Type", "application/json; charset=utf-8");
        res.json(price);
    });  
}); 

//メンバーを参照するAPI
app.get('/api/members', (req, res) => {
    var members = [];
    db.get_members(function (members) {
        //console.log(members);
        res.header("Content-Type", "application/json; charset=utf-8");
        res.json(members);
    });  
}); 


/*
server.on('request', function (req, res) {

    //�}�b�s���O
    app.get(req.url == '/api/members' && req.method == 'GET') {
        var members = [];
        db.get_members(function (members) {
            console.log(members);
            res.send('members');
        });  
    }
    if (req.url == '/admin' && req.method == 'GET') {
            render_form.a_template(res,admin_template);
    }
    else if (req.url == '/admin' && req.method == 'POST') {
        req.data = "";
        // �t�H�[������̃f�[�^����M
        req.on("readable", function () {
            req.data += req.read() || '';
            //console.log(req.data);
        });
        req.on("end", function () {
            var query = qs.parse(req.data);
            if (Object.keys(query)[0] == "name") {
                db.add_name(query.name,function () {
                    //console.log(date);
                    //render_form.a_template(res, admin_template);
                });
            }
            else if (Object.keys(query)[0] == "price") {
                db.add_price(query.price,function () {
                    //console.log(date);
                    //render_form.a_template(res, admin_template);
                });
            }
            else if (Object.keys(query)[0] == "d_name") {
                db.delete_checks(query.d_name, function () {
                db.delete_order(query.d_name, function () {
                db.delete_name(query.d_name, function () {
                    //console.log(date);
                    //render_form.a_template(res, admin_template);
                    });
                    });
                });
            }
            else if (Object.keys(query)[0] == "d_price") {
                db.delete_price(query.d_price, function () {
                    //render_form.a_template(res, admin_template);
                });
            }
            else if (Object.keys(query)[0] == "d_order") {
                db.delete_order_id(query.d_order, function () {
                    //render_form.a_template(res, admin_template);
                });
            }

        });
    }
    else if (req.url == '/select' && req.method == 'POST') {
        req.data = "";
        // �t�H�[������̃f�[�^����M
        req.on("readable", function () {
            req.data += req.read() || '';
            //console.log(req.data);
        });
        req.on("end", function () {
            var query = qs.parse(req.data);
            var dates = [];
            var m = moment();
            var temp = m.format("YYYYMMDD");
            
            if (query.date == 99999999) {
                var date = moment(temp).startOf('month').format("YYYYMMDD");
            }
            else {
                var date = Number(query.date);
            }
            temp = moment(temp).startOf('month').format("YYYYMMDD");
            for (i = 0; i < 11; i++){
                dates.push(temp);
                temp=moment(temp).subtract(1, "months").format("YYYYMMDD");

            }
            db.set_order_paid(query.name,query.unpaid,function (unpaid_sum){
            db.get_prices(function (prices) {
                db.get_orders(query.name, date, function (orders) {
                    var date_id = m.format("YYYYMMDDHHmmss");
                    db.set_check(query.name, query.unpaid, query.unpaid_sum, date_id, function (checks) {
                //console.log(date);
                    
                }); 
               }); 
            }); 
            
            });
        });
    }
    else if (req.url == '/finish' && req.method == 'POST') {
        req.data = "";
        // �t�H�[������̃f�[�^����M
        req.on("readable", function () {
            req.data += req.read() || '';
            //console.log(req.data);
        });
        req.on("end", function () {
            var query = qs.parse(req.data);
            //req.session.member_id= query.member_id;
            //posts.push(query.user_name);
            var m = moment();
            var date = m.format("YYYYMMDD");
            db.get_prices(function (prices) {
                var sum = 0;
                for (j = 0; j < prices.length; j++) {
                    price = "p_" + prices[j].price;
                    a = Number(query[price]);
                    sum += a;
                }
            if (sum!=0) {
                db.get_all_orders(function (order_id) {
                    db.add_order(query.name, sum, order_id + 1, date, function () {
                        db.get_orders(query.name, date, function (orders) {
                            //render_form.f_template(query.name, sum, orders, res, finish_template);
                        });
                    });


                });
            }
            else {
                //render_form.template(query, res, order_error_template);
            }
        });
        });
    }
    else {
        msg = 'page not found';

    }
});*/

