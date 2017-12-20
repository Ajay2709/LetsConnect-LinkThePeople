var signupform= require('./modules/signupform_db.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var path    = require("path");


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
  res.send("hello world");

  //res.sendFile(path.join(__dirname+'/WebContent/html/homepage.html'));
  //__dirname : It will resolve to your project folder.
});


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})


app.get('/signup', function(req, res) {
    res.sendFile('WebContent/html/user_signuppage.html', {
        root: __dirname
    });
});
app.post('/SignUpUser', function (req, res) {
   //fetch user details
   //validate data
   //store data to DB
   //send response
   
   console.log("inside-----"+req);
   console.log("inside signup"+JSON.stringify(req.body));
   var email = req.body.email;
   var username = req.body.username;
   var password = req.body.password;
   var response = {"username":username,"password":password,"email":email}
   signupform.usersignup_db(response, res,function(result, response1){
	   console.log("hey"+result);
		if(result){
			response1.send({"status":"success"});
		}
		else 
			response1.send({"status":"error"});
	   
   });
	
})
