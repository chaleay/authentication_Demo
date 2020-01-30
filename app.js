var express = require("express"),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    User =       require("./models/user");
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require('express-session')


mongoose.connect("mongodb://localhost/auth_demo",  { useUnifiedTopology: true });


//execute
var app = express();
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: "I am the cutest doggy ever",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


//passport
passport.use(new LocalStrategy(User.authenticate()));
//serialize
passport.serializeUser(User.serializeUser());
//deserialize
passport.deserializeUser(User.deserializeUser());

//routes

app.get("/", function(req, res){
    res.render('home');
})

//only accessible via login
app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret');
});

//before accessing login pages
function isLoggedIn(req, res, next){
    //next refers to next thing to be called
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login");
}

//auth routes
app.get("/register", function(req, res){
    if(req.isAuthenticated()){
        res.redirect("/");
    }
    else{
        res.render('register');
    }
});

app.post("/register", function(req, res){
    //make a new user object with selected username, but don't save password yet
    //password is passed seperately and hashed
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect('/secret');
            });
        }
    });

});

//Login Routes
//render login form
app.get('/login', function(req, res){
   //if user is already logged in, no need to login in again - redirect
    if(req.isAuthenticated()){
       res.redirect("/");
   }
   else{
       res.render("login");
   }
});

//logout
app.get('/logout', function(req, res){
    req.logOut();
    res.redirect("/");
});

//using middleware - launch this function before proceeding to callback function
app.post('/login', passport.authenticate("local", {
    successRedirect: "/secret", 
    failureRedirect: "/login"
}), function(req, res){

});

app.listen(3000, function(){
    console.log('server has started..');
});