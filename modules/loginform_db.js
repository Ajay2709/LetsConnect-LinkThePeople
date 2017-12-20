var CONSTANTS = require('../utils/constants.js');

module.exports =
{
        userslogin_db: function(response,res,callback){
        console.log("inside login db");
       // var result = false;
        var MongoClient = require('mongodb').MongoClient;
        var url = CONSTANTS.MONGODBURL;
        var email=response.email;
        var password=response.password;
		var t_response=null;
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var myobj = { email:email,password: password };

          console.log("obj"+JSON.stringify(myobj));
          
          db.collection("users").findOne(myobj,{_id:false}),.toArrayfunction((err, result) {
            
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