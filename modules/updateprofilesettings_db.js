var CONSTANTS = require('../utils/constants.js');
module.exports={
	doUpdateSettingsDb:function (response,res,callback){
	console.log("updating db:"+res);
	var result=false;
	var MongoClient = require('mongodb').MongoClient;
	var url = CONSTANTS.MONGODBURL;
	console.log("email:"+res.email);
	var Data = {"email" : response.email,
	"username" : response.username,
	"gender" : response.gender,
	"age" : response.age,
	"dob" : response.dob,
	"city" : response.city,
	"country" : response.country };
	var newData={$set:Data};
	MongoClient.connect(url,function(err,db){
	if(err) throw err;
	db.collection("users").updateOne({"email":response.email},newData,function(err,result){//check
	if(err) throw err;
	console.log("document updated");
	db.close();
	result=true;
	callback(result,res);
});
});
}}
