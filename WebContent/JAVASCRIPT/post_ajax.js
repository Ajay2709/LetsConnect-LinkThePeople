function post(){
	console.log("now in post ajax");
	var postcontent = document.getElementById("textpost").value;
	var postedby = "4";
	var likes = "4";
	var time = new Date().getTime();
	data = {"postcontent":postcontent , "postedby":postedby , "likes":likes , "time":time}
	console.log(JSON.stringify(data));
    $.ajax({
    url: "postService",
    headers:{ 
        "Content-Type":"application/json"
    },
	type: 'POST',
    data: JSON.stringify(data),
	
    success: function (data) {
		//check if the response is success then 
		//window.location = "login";
		console.log("success in post ajax");
		location.reload();
	},
	error: function(data) {
		console.log("failure in post ajax");
    }

	});
	//return false;
}