module.exports =
{
	 addfrienddb: function(response,res,callback){
		console.log("inside mongo db");
		var result = false;
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://balaji:balaji@ds161136.mlab.com:61136/socsite';
		var email=response.email;
		var friendname= response.friendname;
		var friendemail=response.friendemail;
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var myobj = { "friendname":friendname,"friendemail":friendemail};
		  //console.log("obj"+JSON.stringify(myobj));
		  db.collection("users").update({"email":email},{"$push":{"friends":{"$each":[myobj]}}} ,function(err, result) {
			if (err) throw err;
			console.log("res"+result);
			db.close();
			console.log("db close");
			result = true;
			callback(result, res);
			
		  });
		});	
	}
}
