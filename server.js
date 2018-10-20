var express = require('express');
var pgp = require('pg-promise')();
//var db = pgp(process.env.DTABASE_URL);
var db = pgp('postgres://lalsbkqxiqldvm:aebb8c07d42d0aacfef5a02069165d73072a39d7ac23a3aaad1aa949bd65f3da@ec2-23-21-171-249.compute-1.amazonaws.com:5432/d982h3jv1i41pv?ssl=true')
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (request, response) {
//     response.send('<h1>Hello, Express.js<h1>');
// });

// app.get('/test', function (request, response) {
//     response.send('<h1>Test</h1>');
// });

// app.use(express.static('static'));


app.set('view engine','ejs');
app.get('/', function(req,res){
    res.render('pages/index');
});
app.get('/index', function(req,res){
    res.render('pages/index');
});
app.get('/about', function(req,res){
    var name = 'Phaplak Saethapan';
    var hobbies =['Music','Movie','Programing'];
    var dob = '09/06/1997';
    res.render('pages/about',{fullname : name, hobbies : hobbies, dob : dob});   
});


//products
app.get('/products', function(req,res){
    var id = req.param('id');
    var sql = 'select * from products';
    if(id){
        sql += ' where id = '+ id; 
    }
        db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/products',{products : data});
        })
        .catch(function(error){
            console.log('ERROR:'+error);
        })
    
});

//display products
app.get('/products/:pid', function(req,res){
    var pid = req.params.pid;
    var sql = "select * from products where id =" + pid;
    db.any(sql)
    .then(function(data){
        //console.log('DATA:'+data);
        res.render('pages/product_edit',{product : data[0]});
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })
   
    
});

//add new product
app.get('/addnewproduct',function(req, res) {
    res.render('pages/addnew');
});

app.post('/product/addnewproduct', function(req,res){
    var id = req.body.id;
    var title = req.body.title;
    var price = req.body.price;
    var sql = `INSERT INTO products (id, title, price)
    VALUES ('${id}', '${title}', '${price}')`;
    //db.none 
    console.log('UPDATE:' + sql);
    db.query(sql)
    .then(function (data) {
        console.log('DATA:' + data);
        res.redirect('/products')

    })
    .catch(function (error) {
        console.log('ERROR:' + error);
    })
    
})

// update product
app.post('/product/update', function(req,res){
    var id = req.body.id;
    var title = req.body.title;
    var price = req.body.price;
    var sql = `update products 
    set title =  '${title}' , price = '${price}'
    where id = '${id}'`;

    //db.none 
    console.log('UPDATE:' + sql);
    db.any(sql)
    .then(function (data) {
        console.log('DATA:' + data);
        res.redirect('/products')

    })
    .catch(function (error) {
        console.log('ERROR:' + error);
    })
    
})


// delete product
app.get('/product_delete/:id', function(req,res){
    var id = req.params.id;
    var sql = 'DELETE FROM products';
    if(id){
        sql += ' where id ='+ id; 
    }
    db.any(sql)
    .then(function (data) {
        console.log('DATA:' + data);
        res.redirect('/products')

    })
    .catch(function (error) {
        console.log('ERROR:' + error);
    })
    
})


///// User /////
//users
app.get('/users', function(req,res){
    var id = req.param('id');
    var sql = 'select * from users';
    if(id){
        sql += ' where id = '+ id; 
    }
        db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/users',{users : data});
        })
        .catch(function(error){
            console.log('ERROR:'+error);
        })
    
});

//display users
app.get('/users/:pid', function(req,res){
    var pid = req.params.pid;
    var sql = "select * from users where id =" + pid;
    db.any(sql)
    .then(function(data){
        //console.log('DATA:'+data);
        res.render('pages/user_edit',{product : data[0]});
    })
    .catch(function(error){
        console.log('ERROR:'+error);
    })
   
    
});

//add new product
app.get('/addnewuser',function(req, res) {
    res.render('pages/adduser');
});

app.post('/user/addnewuser', function(req,res){
    var id = req.body.id;
    var title = req.body.title;
    var price = req.body.price;
    var sql = `INSERT INTO products (id, email, password)
    VALUES ('${id}', '${email}', '${password}')`;
    //db.none 
    console.log('UPDATE:' + sql);
    db.query(sql)
    .then(function (data) {
        console.log('DATA:' + data);
        res.redirect('/users')

    })
    .catch(function (error) {
        console.log('ERROR:' + error);
    })
    
})








var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log('App is running on http://localhost:' + port);
});