function getposts(){  
	
    $.ajax({
    url:'getPosts',
    headers:{ 
        "Content-Type":"application/json"
    },
    type: 'GET',
    success: function (response) {
		console.log("return to ajax call success");
		//console.log(JSON.stringify(response[0]));
		displayposts(response);
		getfriendlist();
	},
	error:function (response) {
		console.log("return to ajax call failed");
	}
	});
    return false;
}
function getfriendlist(){  
	console.log("getfriendlist ajax called");
    $.ajax({
    url:'getFriendListService',
    headers:{ 
        "Content-Type":"application/json"
    },
    type: 'GET',
    success: function (response) {
		console.log("return to getfriendlist ajax call success"+JSON.stringify(response));
		//console.log(JSON.stringify(response[0]));
		displayfriendlist(response);
	},
	error:function (response) {
		console.log("return to getfriendlist ajax call failed"+response);
	}
	});
    return false;
}
function displayposts(posts){
	//console.log(JSON.stringify(posts));
	for(p in posts){
		var newPost = "<section class='postItem'>\
						<div class='postedby'><b><i>"+posts[p].postedby+"</b></i> posted at "+posts[p].time+"</div><br>\
						<div class='postcontent'><b><i>"+posts[p].postcontent+"</b></i></div><br><br>\
						<div class='likes'>"+posts[p].likes+"</div>\
						<section>";
						
		//console.log("newpost"+newPost);
		$("#postnow").append(newPost);
	}
}
function displayfriendlist(friends){
	$("#friendlist").append("<p class='friendsheader'>Friends</P>");
	console.log("now in displayfriendlist");
	for(f in friends){
		var friendlist ="\
						<section class='friends'>\
						<div><b><i>"+friends[f].username+"</b></i>"+" - "+friends[f].email+"</div>\
						</section>";
		console.log("email:"+friends[f].email+" username:"+friends[f].username);
		$("#friendlist").append(friendlist);
	}
}