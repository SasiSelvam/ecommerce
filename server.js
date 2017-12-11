var express = require('express');
var morgan  = require('morgan');
var mongoose  = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejs_mate = require('ejs-mate');


var User = require('./models/user');




var app = express();

mongoose.connect('mongodb://root:abc123@ds135876.mlab.com:35876/ecommerce',function(err){
  if (err) {
    console.log(err);
  }else{
    console.log("Connected to the database");
  }
});

//MiddleWare
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.engine('ejs',ejs_mate);
app.set('view engine','ejs');

//route
app.post('/create-user',function(req,res,next){
  var user= new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save(function(err){
    if (err) {
    return next(err);
    }
    res.json('Successfully created a user');
  });
});
// app.get('/',function(req,res){
//   var name= "Selvam"
//   res.json("My name is " + name);
// });
//
// app.get('/catname',function(req,res){
//
//   res.json("Catwoman");
// });

// app.post('/name',function(req,res){
//   var name= "Selvam"
//   res.json("My name is " + name);
// });
//
// app.put('/name',function(req,res){
//   var name= "Selvam"
//   res.json("My name is " + name);
// });
//
// app.delete('/delete',function(req,res){
//   var name= "Selvam"
//   res.json("My name is " + name);
// });

app.get('/',function(req,res){
  res.render('main/home'); //home.ejs
});

app.get('/about',function(req,res){
  res.render('about'); //about.ejs
});

//port 3000
app.listen(3000,function(err){
  if(err) throw err;
  console.log("Server is Running on port 3000");
});
