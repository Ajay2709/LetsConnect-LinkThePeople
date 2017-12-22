function addFriendFun(data){
	var email = "";
	var friendname = data.name;
	var friendemail = data.email;
	data = {"email":email,"friendname":friendname,"friendemail":friendemail};
	console.log("in addfriend ajax"+JSON.stringify(data));
    $.ajax({
    url: "addFriendsService",
    headers:{ 
        "Content-Type":"application/json"
    },
	type: 'POST',
    data: JSON.stringify(data),
	
    success: function (data) {
		//check if the response is success then 
		//window.location = "login";		
		console.log("success in Ajax");
	},
	error: function(data) {
		console.log("failure in Ajax");
    }

	});
	//return false;
}