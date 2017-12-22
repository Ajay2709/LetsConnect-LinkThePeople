function saveSettings() {
	//console.log("saveSettings called");
	var userdata = {	"email": "",
						"username" : document.getElementById('username').value,
						"gender" : document.getElementById('gender').value,
						"dob" : document.getElementById('dobday').value+"-"+document.getElementById('dobmonth').value+"-"+document.getElementById('dobyear').value,
						"age" : document.getElementById('age').value,
						"city" : document.getElementById('city').value,
						"country" : document.getElementById('country').value
					};
	console.log(userdata);
	$.ajax({
		url : 'saveProfileSettingsService',
		headers : { "Content-Type":"application/json"},
		type : 'POST',
		data : JSON.stringify(userdata),
		success : function(userdata){
		//console.log("return to ajax call success"+userdata);//JSON.stringify(userdata)
			location.reload();
		},
		error:function(userdata){
		//console.log("return to ajax call failure"+JSON.stringify(userdata));//JSON.stringify(userdata)
	}
	});
return false;
}

function getUserDetails() {
	//console.log("saveSettings called");
	
	$.ajax({
		url : 'getUserDetails',
		headers : { "Content-Type":"application/json"},
		type : 'GET',
		success : function(response){
		//console.log("return to ajax call success"+userdata);//JSON.stringify(userdata)
			document.getElementById('username').setAttribute('placeholder',response.username);
			document.getElementById('age').setAttribute('placeholder',response.age);
			document.getElementById('city').setAttribute('placeholder',response.city);
			document.getElementById('country').setAttribute('placeholder',response.country);
			if(response.dob!=null && response.dob!=undefined){
				var date=response.dob.split("-");
				document.getElementById('dobday').setAttribute('placeholder',date[0]);
				document.getElementById('dobmonth').setAttribute('placeholder',date[1]);
				document.getElementById('dobyear').setAttribute('placeholder',date[2]);
			}
		},
		error:function(response){
		//console.log("return to ajax call failure"+JSON.stringify(userdata));//JSON.stringify(userdata)
	}
	});
return false;
}