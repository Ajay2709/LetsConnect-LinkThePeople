module.exports =
{
	 postdb: function(response,res,callback){
		console.log("inside mongo db");
		var result = false;
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://balaji:balaji@ds161136.mlab.com:61136/socsite';
		var postcontent = response.postcontent;
		var postedby = response.postedby;
		var likes = response.likes;
		var time = response.time;
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var myobj = { postcontent: postcontent, postedby: postedby, likes:likes, time:time  };
		  console.log("obj"+JSON.stringify(myobj));
		  db.collection("posts").insertOne(myobj, function(err, result) {
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
