
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const ejs = require("ejs");

const app = express();
console.log();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});


userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password']} );

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render('home');
});

app.get("/register", function(req, res){
  res.render('register');
});

app.get("/login", function(req, res){
  res.render('login');
});

app.post("/register", function(req, res){
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function(req, res){
  User.findOne({username: req.body.username}, function(err, foundUser){
    if(err){
      console.log(err);
    } else {
      if(foundUser.password == req.body.password){
        res.render("secrets");
      }
    }
  })
});


app.listen(3000, function(){
  console.log("Server started on Port 3000");
});
