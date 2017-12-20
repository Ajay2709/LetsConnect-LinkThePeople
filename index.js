var signupform= require('./modules/signupform_db.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var path    = require("path");

app.set('port', (process.env.PORT || 8080));


app.use(express.static('WebContent'));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.get('/',function(req,res){
  
  console.log("index page");
  //res.send("hello world");

  res.sendFile(path.join(__dirname+'/WebContent/html/main_home_page.html'));
  //__dirname : It will resolve to your project folder.
});


//login page
app.get('/login', function(req, res) {
    res.sendFile('WebContent/html/user_loginpage.html', {
        root: __dirname
    });
});


//register user
app.get('/signUp', function(req, res) {
    res.sendFile('WebContent/html/user_signuppage.html', {
        root: __dirname
    });
});


//addpost
app.get('/post', function(req, res) {
    res.sendFile('WebContent/html/homepage.html', {
        root: __dirname
    });
});



var server = app.listen(app.get('port'), function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});
