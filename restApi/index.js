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
var cors = require('cors');
const bodyParser = require('body-parser');

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
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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
app.get('/api/price', (req, res) => {
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
        res.set("Content-Type", "application/json; charset=utf-8");
        res.json(members);
        //res.json("{ name: '長谷川' }");
    });  
}); 

//購入履歴を参照するAPI(dateはYYYYMMDDの方式で ex.20190801)
app.get('/api/order/:name/date/:date', (req, res) => {
    var orders = [];
    console.log(req.params.name);
    console.log(req.params.date);
    db.get_orders(req.params.name, req.params.date, function (orders) {

        res.json(orders);
   }); 
}); 

//購入履歴の合計
app.get('/api/order/sum/:name/date/:date', (req, res) => {
    var orders = [];
    var temp=0;
    db.get_orders(req.params.name, req.params.date, function (orders) {
        for (i = 0; i < orders.length;i++){
            temp += orders[i].price;
        }
        var sum={"sum":temp};
        res.json(sum);
   }); 
}); 

//清算履歴を参照するAPI(dateはYYYYMMDDの方式で ex.20190801)
app.get('/api/check/:name/date/:date', (req, res) => {
    var checks = [];
    db.get_checks(req.params.name, req.params.date, function (checks) {
        res.json(checks);
   }); 
}); 

//未清算額を参照するAPI
app.get('/api/check/unpaid/:name', (req, res) => {
    var unpaid_sum=0;
    db.get_unpaidsum(req.params.name,function (unpaid_sum){
        res.json(unpaid_sum);
   }); 
}); 

//Create
//メンバー追加
app.post('/api/add/member/', (req, res) => {
    db.add_name(req.body.name,function (err) {
        if(err){
            res.send('400')
        }
        else{
            res.send('200')
        }
    });
}); 

//値段追加
app.post('/api/add/price/', (req, res) => {
    db.add_price(req.body.price,function (err) {
        if(err){
            res.send('405')
        }
        else{
            res.send('200')
        }
    });
}); 

//Update
//orderを取る
app.post('/api/update/order/', (req, res) => {
    db.add_order(req.body.name,req.body.price,function (err) {
        if(err){
            res.send('500')
        }
        else{
            res.send('200')
        }
    });
}); 

//清算を実施する
app.post('/api/update/check/', (req, res) => {
    db.get_unpaidsum(req.body.name,function (unpaid_sum){
        if(unpaid_sum==0){
            res.send('200')
        }
        else{
    db.set_order_paid(req.body.name,unpaid_sum,function (err) {
        if(err){
            res.send('200')
        }
        else{
            res.send('500')
        }
    });
}
});
}); 

//メンバーをdelete
app.delete('/api/delete/member/:name', (req, res) => {
    var orders = [];
    db.delete_name(req.params.name, function (err) {
        if(err){
            res.send('404')
        }
        else{
            res.send('200')
        }
   }); 
}); 

//priceをdelete
app.delete('/api/delete/price/:price', (req, res) => {
    db.delete_price(req.params.price, function (err) {
        if(err){
            res.send('404')
        }
        else{
            res.send('200')
        }
   }); 
}); 

//全てのオーダーをdelete
app.delete('/api/delete/order/all/:name', (req, res) => {
    db.delete_order(req.params.name, function (err) {
        if(err){
            res.send('404')
        }
        else{
            res.send('200')
        }
   }); 
}); 

//一部のオーダーをdelete
app.delete('/api/delete/order/:orderId', (req, res) => {
    db.delete_order_id(req.params.orderId, function (err) {
        if(err){
            res.send('404')
        }
        else{
            res.send('200')
        }
   }); 
}); 


app.delete('/api/delete/check/:name', (req, res) => {
    db.delete_checks(req.params.name, function (err) {
        if(err){
            res.send('404')
        }
        else{
            res.send('200')
        }
   }); 
}); 


//日付
app.get('/api/dates/', (req, res) => {
    var m = moment();
    var dates = [];
    var temp = m.format("YYYYMMDD");
    var date = moment(temp).startOf('month').format("YYYYMMDD");
            for (i = 0; i < 11; i++){
                dates.push(date);
                date=moment(date).subtract(1, "months").format("YYYYMMDD");
            }
    res.json(dates);

   
}); 


