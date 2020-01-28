var express = require("express"),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    User =       require("./models/user");
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
 
mongoose.connect("mongodb://localhost/auth_demo",  { useUnifiedTopology: true });


//execute
var app = express();
app.set('view engine', 'ejs');

app.use(require("express-session")({
    secret: "I am the cutest doggy ever",
    resave: false,
    saveUnitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


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