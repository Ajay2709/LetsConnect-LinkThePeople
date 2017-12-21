var signupform= require('./modules/signupform_db.js');
var loginform = require('./modules/loginform_db.js');
var update = require('./modules/updateprofilesettings_db.js');
var getuser = require('./modules/getuserdetails_db.js');
var cookieParser = require('cookie-parser');
var express = require('express');
var constants = require('./utils/constants.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

var path    = require("path");
app.set('port', (process.env.PORT || 8080));

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

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
    if(req.session.email != null && req.session.email != undefined && req.session.email != ''){
		console.log("email already in session");
		res.sendFile('WebContent/html/homepage.html', {
			root: __dirname
		});
	}
	else{
		console.log("email not in session");
		res.sendFile('WebContent/html/user_loginpage.html',{
			root: __dirname
		});
	}
});


//edit user details page
app.get('/editProfile', function(req, res) {
    res.sendFile('WebContent/html/profileSettings.html', {
        root: __dirname
    });
});



//signup user service

app.post('/signupUserService', function (req, res) {
   //console.log("inside-----"+req);
  // console.log("inside signup"+JSON.stringify(req.body));
   var email = req.body.email;
   var username = req.body.username;
   var password = req.body.password;
   var response = {"username":username,"password":password,"email":email}
   //mongoDB operation//
   signupform.usersignup_db(response, res,function(result, response1){
    if(result){
      response1.send({"status":"success"});
    }
    else 
      response1.send({"status":"error"});
     
   });
   //mongoDB operation//

  
});


//login user service
app.post('/'+constants.USER_LOGIN_AJAX, function (req, res) {

  console.log("loginService")

   var email = req.body.email;
   var password = req.body.password;
   var response = {"email":email,"password":password};

   loginform.userslogin_db(response, res,function(result, response1){

        if(result.length > 0 ){
			var user_email = result[0].email ;
			req.session.email=user_email;
            console.log("login success : "+user_email);
            response1.send({"status":"success"});
        }
        else 
            response1.send({"status":"error"});
   });
    
});

//edit profile settings

app.post('/saveProfileSettingsService',function(req,res){
	console.log("now at app.post");
	if(req.session.email != null && req.session.email != undefined && req.session.email != ''){
		var response = {"email" : req.session.email,
					"username" : req.body.username,
					"gender" : req.body.gender,
					"age" : req.body.age,
					"dob" : req.body.dob,
					"city" : req.body.city,
					"country" : req.body.country };
		console.log('saveProfileSettingsService '+JSON.stringify(response));				
		update.doUpdateSettingsDb(response,res,function(result,response1){
			console.log("got "+result);
			if(result){
				response1.send({"status":"success"});
			}
			else {
				response1.send({"status":"failure"});
			}
		});
	}
	else{
		res.sendFile('WebContent/html/user_loginpage.html',{
			root: __dirname
		});
	}
});


//get user details
app.get('/getUserDetails', function(req, res) {
    if(req.session.email != null && req.session.email != undefined && req.session.email != ''){
		console.log("email already in session");
		var userData = {"email": req.session.email};
		getuser.getUserDetails(userData, res,function(result, response1){
        if(result.length > 0 ){
            var user_email = result[0].email ;
			req.session.email=user_email;
            console.log("login success : "+user_email);
            response1.send(result[0]);
        }
        else 
            response1.send({"status":"error"});
   });
		
	}
	else{
		res.send({"status":"error"});
	}
});


//register user
app.get('/signup', function(req, res) {
    if(req.session.email != null && req.session.email != undefined && req.session.email != ''){
		console.log("email already in session");
		res.sendFile('WebContent/html/homepage.html', {
			root: __dirname
		});
	}
	else{
		console.log("email not in session");
		res.sendFile('WebContent/html/user_signuppage.html',{
			root: __dirname
		});
	}
});


//addpost
app.get('/post', function(req, res) {
	
	//check if email is in session - yes: user already logged in
	if(req.session.email != null && req.session.email != undefined && req.session.email != ''){
		console.log("email already in session");
		res.sendFile('WebContent/html/homepage.html', {
			root: __dirname
		});
	}
	else{
		console.log("email not in session");
		res.sendFile('WebContent/html/user_loginpage.html',{
			root: __dirname
		});
	}
});


//logout
app.get('/logout',function(req,res){
	req.session.email=null;
	res.sendFile('WebContent/html/main_home_page.html',{
			root: __dirname
	});
});


var server = app.listen(app.get('port'), function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});

//post the content in text

var postcheck=require('./modules/post_db.js');

app.post('/postService', function (req, res) {
   //console.log("inside-----"+req);
  // console.log("inside signup"+JSON.stringify(req.body));
    if(req.session.email != null && req.session.email != undefined && req.session.email != ''){
	   var postcontent = req.body.postcontent;
	   var postedby = req.body.postedby;
	   var likes = req.body.likes;
	   var time = req.body.time;
	   var response = {"postcontent":postcontent , "postedby":postedby , "likes":likes , "time":time}
	   //mongoDB operation//
	   postcheck.postdb(response, res,function(result, response1){
		if(result){
		  response1.send({"status":"success"});
		}
		else 
		  response1.send({"status":"error"});
		 
	   });
	}
   //mongoDB operation//
   else{
		console.log("email not in session");
		res.sendFile('WebContent/html/user_loginpage.html',{
			root: __dirname
		});
	}

  
});