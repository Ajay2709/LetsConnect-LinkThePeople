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
		//getfriendlist();
	},
	error:function (response) {
		console.log("return to ajax call failed");
	}
	});
    return false;
}

function startfetch(){
	getposts();
	getUserFriendList();
}
function getfriendlist(userFriendList){  
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
		displayfriendlist(userFriendList,response);
	},
	error:function (response) {
		console.log("return to getfriendlist ajax call failed"+response);
	}
	});
    return false;
}
function displayposts(posts){
	console.log("now in displayposts");
	for(p in posts){
		var newPost = "<section class='postItem'>\
						<div class='postedby'><b><i>"+posts[p].postedby+"</b></i> posted at "+Date(posts[p].time).toString()+"</div><br>\
						<div class='postcontent'><b><i>"+posts[p].postcontent+"</b></i></div><br>\
						<section>";
						
		//console.log("newpost"+newPost);
		$("#postnow").append(newPost);
	}
}
function displayfriendlist(userFriendList,friends){
	$("#friendlist").append("<p class='friendsheader'>Friends</P>");
	console.log("now in displayfriendlist");
	for(f in friends){
		
		var data = {"email":'',"nameemail":friends[f].username,"emailfriend":friends[f].email};
		
		var isNotFriend = "<input type='button' value='addFriend' onclick='javascript:addFriendFun();'/>"
		var isFriend = "<div>isFriend</div>";
		var friendlist ="\
						<section class='friends'>\
						<div><b><i>"+friends[f].username+"</b></i>"+" -<i> "+friends[f].email+"</i></div>";
		
		var isAlreadyFriend = false;
		
		
		if(userFriendList.indexOf(friends[f].email) != -1){
			isAlreadyFriend = true;
		}			
		
			if(isAlreadyFriend){
				friendlist = friendlist+isFriend;
			}else{
				friendlist = friendlist+isNotFriend;
			}
			
			friendlist = friendlist+"</section>";
			
		console.log("email:"+friends[f].email+" username:"+friends[f].username);
		$("#friendlist").append(friendlist);
	}
}

function getUserFriendList() {
	//console.log("saveSettings called");
	
	$.ajax({
		url : 'getUserDetails',
		headers : { "Content-Type":"application/json"},
		type : 'GET',
		success : function(response){
			
			console.log("return to ajax call success"+JSON.stringify(response));
			
			
			
			var friendListArray = [];
			
			if(response != null && response.friends != null && response.friends != undefined){
				
				var profilename = response.username;
				document.getElementById("profilename").innerHTML = profilename;//setAttribute('profilename',profilename);
				console.log("username:"+profilename);
				for(friendItem in response.friends){
					console.log("DEBUG: "+JSON.stringify(response.friends[friendItem]));
					friendListArray.push(response.friends[friendItem].emailfriend);
				}
			}
			
			
			getfriendlist(friendListArray);
			
			
		},
		error:function(response){
		//console.log("return to ajax call failure"+JSON.stringify(userdata));//JSON.stringify(userdata)
	}
	});
return false;
}


