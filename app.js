const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/secretsDB", {useNewUrlParser: true, useUnifiedTopology: true});

const secretSchema = new mongoose.Schema({

});

const Secret = mongoose.model("Secret", secretSchema);

app.get("/", function(req, res){
  res.render('home')
})


app.listen(3000, function(){
  console.log("Server started on Port 3000");
});
