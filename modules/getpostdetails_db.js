var CONSTANTS = require('../utils/constants.js');
module.exports =
{
    getPostDetails: function(res,callback){
        console.log("inside getposts db");
       // var result = false;
        var MongoClient = require('mongodb').MongoClient;
        var url = CONSTANTS.MONGODBURL;
        //var email=response.email;
        var t_response=null;
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myobj = {};

        //console.log("obj"+JSON.stringify(myobj));
          
        db.collection("posts").find({},{_id:false}).sort({"time":-1}).toArray(function(err, result) {    
            if (err) 
                throw err;
			if(t_response==null){
				t_response=result;
				console.log(JSON.stringify(result));
				callback(result,res);
			}
            db.close();
            
            });

        });


    },
	getFriendList: function(res,callback){
        console.log("inside getposts db");
       // var result = false;
        var MongoClient = require('mongodb').MongoClient;
        var url = CONSTANTS.MONGODBURL;
        //var email=response.email;
        var t_response=null;
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myobj = {};

        //console.log("obj"+JSON.stringify(myobj));
          
        db.collection("users").find({},{_id:false}).toArray(function(err, result) {  
				
            if (err) 
                throw err;
			if(t_response==null){
				t_response=result;
				console.log(JSON.stringify(result));
				callback(result,res);
			}
            db.close();
            
            });

        });


    }
}