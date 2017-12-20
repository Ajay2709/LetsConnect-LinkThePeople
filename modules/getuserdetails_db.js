var CONSTANTS = require('../utils/constants.js');
module.exports =
{
        getUserDetails: function(response,res,callback){
        console.log("inside login db");
       // var result = false;
        var MongoClient = require('mongodb').MongoClient;
        var url = CONSTANTS.MONGODBURL;
        var email=response.email;
        var t_response=null;
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myobj = { email:email};

        //console.log("obj"+JSON.stringify(myobj));
          
        db.collection("users").find(myobj,{_id:false}).toArray(function(err, result) {    
            if (err) 
                throw err;
			if(t_response==null){
				t_response=result;
				callback(result,res);
			}
            db.close();
            
            });

        });


    }
}