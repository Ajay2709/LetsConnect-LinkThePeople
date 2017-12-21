function getposts(){  
	
    $.ajax({
    url:'getPosts',
    headers:{ 
        "Content-Type":"application/json"
    },
    type: 'GET',
    success: function (response) {
		console.log("return to ajax call success"+JSON.stringify(response));
		//console.log(JSON.stringify(response[0]));
		displayPosts(response);
	},
	error:function (response) {
		console.log("return to ajax call failed"+response);
	}
	});
    return false;
}
function displayPosts(posts){
	console.log(JSON.stringify(posts));
	for(p in posts){
		var newPost = "<section class='postItem'>\
						<div class='postedby'><b><i>"+posts[p].postedby+"</b></i> posted at "+posts[p].time+"</div><br>\
						<div class='postcontent'><b><i>"+posts[p].postcontent+"</b></i></div><br><br>\
						<div class='likes'>"+posts[p].likes+"</div>\
						<section>";
						
		console.log("newpost"+newPost);
		$("#postnow").append(newPost);
	}
}