var config = require('./config');
var pg = require('pg');
var moment = require('moment');
var qs = require('querystring');
var util = require('./util');




exports.get_members = function (callback) {

    setTimeout(function () {
        var member_id = [];
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                 console.err('could not connect to postgres', err);
            }
            client.query('select * from lab_members;', function (err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                members = result.rows;
                callback(members);
                client.end();

                

            });
        });
  
        
    },0);
}



exports.get_prices = function (callback) {

    setTimeout(function () {
        var member_id = [];
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query('select * from prices order by price asc;', function (err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                prices = result.rows;
                callback(prices);
                client.end();



            });
        });


    }, 0);
}


exports.get_orders = function (name,date,callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        date = String(date);
        var end_date = moment(date).endOf('month').format("YYYYMMDD");
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query('select * from orders where date >=$1 and date <=$2 and name=$3 ORDER BY order_id DESC',[date,end_date,name],function (err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                orders = result.rows;
                client.end();
                callback(orders);



            });
        });


    }, 0);
}

exports.get_checks = function (name,date,callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        date = String(date);
        var end_date = moment(date).endOf('month').format("YYYYMMDD");
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query('select * from checks where date >=$1 and date <=$2 and name=$3 ORDER BY check_id DESC',[date,end_date,name],function (err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                checks = result.rows;
                client.end();
                callback(checks);

            });
        });


    }, 0);
}

exports.get_unpaidsum = function (name,callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        var unpaid_sum = 0;
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
                //console.log(text);
                client.query("SELECT price from orders where name=$1 and paid=0", [name], function (err, result) {
                    for (i = 0; i < result.rows.length;i++){
                        unpaid_sum += result.rows[i].price;
                    }
                    //console.log(result.rows);
                callback(unpaid_sum);
                client.end();
                });
            
        });


    }, 0);
}



exports.get_all_orders = function (callback) {
    setTimeout(function () {


        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query('select max(order_id) from orders ', function (err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                
                client.end();
                callback(result.rows[0].max);



            });
        });


    }, 0);
}



exports.add_order = function (name, price, order_id,date,callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("INSERT INTO  orders(name,price,date,order_id,paid) values($1,$2,$3,$4,0)", [name, price,date, order_id], function (err, result) {
                //console.log(text);
                callback();
                client.end();

            });
        });


    }, 0);
}

exports.set_order_paid = function (name,paid,callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        var unpaid_sum = 0;
        var today = 0;
        if (paid == 1) {
            today = moment().format("YYYYMMDD");
        }
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("UPDATE orders SET paid=$1 where name=$2 and paid=0", [today,name],function (err) {
                //console.log(text);
                client.query("SELECT price from orders where name=$1 and paid=0", [name], function (err, result) {
                    for (i = 0; i < result.rows.length;i++){
                        unpaid_sum += result.rows[i].price;
                    }
                    //console.log(result.rows);
                callback(unpaid_sum);
                client.end();
                });
            });
        });


    }, 0);
}

exports.set_check = function (name, paid,unpaid_sum,date_id, callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        var today = 0;
        var checks=[]
        if (paid == 1) {
            //console.log(date_id);
            today = moment().format("YYYYMMDD");
            client.connect(function (err) {
                if (err) {
                    console.err('could not connect to postgres', err);
                }
                client.query("INSERT INTO checks VALUES($1,$2,$3,$4)", [date_id,name,unpaid_sum,today], function (err) {
                    //console.log(err);
                    client.query("SELECT * from checks where name=$1 ORDER by check_id DESC ", [name], function (err, result) {
                        checks = result.rows;
                        client.end();
                        callback(checks);
                    });
                });
            });
        }
        else {
            client.connect(function (err) {
                if (err) {
                    console.err('could not connect to postgres', err);
                }
                client.query("SELECT * from checks where name=$1 ORDER by check_id DESC", [name], function (err, result) {
                checks = result.rows;
                //console.log(checks);
                client.end();
                callback(checks);
                });
            });
        }

    }, 0);
}


exports.add_price = function (price, callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("INSERT INTO  prices(price,freq) values($1,0)", [price], function (err, result) {
                //console.log(text);
                callback();
                client.end();

            });
        });


    }, 0);
}


exports.delete_price = function (price, callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("DELETE FROM  prices where price=$1", [price], function (err, result) {
                //console.log(text);
                callback();
                client.end();

            });
        });


    }, 0);
}

exports.add_name = function (name, callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("INSERT INTO  lab_members(name) values($1)", [name], function (err, result) {
                //console.log(text);
                callback();
                client.end();

            });
        });


    }, 0);
}

exports.delete_name = function (name, callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("DELETE FROM lab_members where name=$1", [name], function (err, result) {
                //console.log(text);
                callback();
                client.end();

            });
        });


    }, 0);
}

exports.delete_order = function (name, callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("DELETE FROM  orders where name=$1", [name], function (err, result) {
                //console.log(text);
                callback();
                client.end();

            });
        });


    }, 0);
}

exports.delete_order_id = function (order_id, callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("DELETE FROM  orders where order_id=$1", [order_id], function (err, result) {
                //console.log(text);
                callback();
                client.end();

            });
        });


    }, 0);
}

exports.delete_checks = function (name, callback) {
    setTimeout(function () {
        var client = new pg.Client(config.constring);
        client.connect(function (err) {
            if (err) {
                console.err('could not connect to postgres', err);
            }
            client.query("DELETE FROM  checks where name=$1", [name], function (err, result) {
                //console.log(text);
                callback();
                client.end();

            });
        });


    }, 0);
}
