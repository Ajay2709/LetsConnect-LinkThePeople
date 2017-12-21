function addFriendFun(){
	var email = "";
	var nameemail = "ajay";
	var emailfriend = "ajaynba001@gmail.com";
	data = {"email":email,"nameemail":nameemail,email,"emailfriend":emailfriend};
	console.log(JSON.stringify(data));
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