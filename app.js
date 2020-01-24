var express = require("express"),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser');

 
mongoose.connect("mongodb://localhost/auth_demo",  { useUnifiedTopology: true });


//execute
var app = express();


app.set('view engine', 'ejs');


//routes

app.get("/", function(req, res){
    res.render('home');
})


app.get('/secret', function(req, res){
    res.render('secret');
});


app.listen(3000, function(){
    console.log('server has started..');
});