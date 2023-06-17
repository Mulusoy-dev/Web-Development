require('dotenv').config(); 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


let secretCollection;
let client;

// express-session
app.use(session({
    secret: "My secret is secret.",
    resave: false,
    saveUninitialized: false
}));

// passport Init
app.use(passport.initialize());
app.use(passport.session());


// // Replace the uri string with your connection string.
// const uri = `mongodb+srv://melih:${process.env.API_KEY}@cluster0.tokxl.mongodb.net/newUserDB?retryWrites=true&w=majority`;
const uri = 'mongodb://127.0.0.1:27017/userDB';
mongoose.connect(uri, {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB Atlas connected');
}).catch(err => {
    console.log('MongoDB Atlas connection error: ' + err);
});


// Schema
const UserSchema = new mongoose.Schema ({
    email: String,
    password: String
});

//passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);


// Model
const User = new mongoose.model("User", UserSchema);
module.exports = User;

// passport-local-mongoose
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());












app.get('/', (req, res) => {
    res.render('home');
});


app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/register', (req, res) => {
    res.render('register');
});



app.get("/secrets", (req,res) => {
    if(req.isAuthenticated()){
      res.render("secrets");
    }else{
      res.redirect("/login")
    }
});


app.post('/register', (req, res) => {
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
            res.redirect('/secrets');
            });
        }
        
    });
  

});






app.post('/login', function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    req.login(user, function(err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
            res.redirect('/secrets');
            });
        }
    });


});


app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});






app.listen(3000, function() {
    console.log("Server started on port 3000.");
});