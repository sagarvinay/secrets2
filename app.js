
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

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
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const newUser = new User({
      username: req.body.username,
      password: hash
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });


});

app.post("/login", function(req, res){
  User.findOne({username: req.body.username}, function(err, foundUser){
    if(err){
      console.log(err);
    } else {
      if(foundUser){
        bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
          if(result == true){
            res.render("secrets");
          }
        });

      }
    }
  })
});


app.listen(3000, function(){
  console.log("Server started on Port 3000");
});
