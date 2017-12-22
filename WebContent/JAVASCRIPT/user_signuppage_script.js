var check = function() {
	var email = document.getElementById('email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
		document.getElementById("emailval").innerHTML="This email is invalid ";
		//exit();
	}
	else{
		document.getElementById("emailval").innerHTML="";
		//exit();
	}
}
var checkuser = function(){
	var usr=  /^[A-Za-z]\w{7,14}$/; 
	if(document.getElementById('usrname').value.match(usr)){
		document.getElementById("userval").innerHTML="";
	}	
	else 
	{  
		document.getElementById("userval").innerHTML="This name is invalid";
		//exit()
	}
	if(document.getElementById('usrname').value.length < 8 ){
		document.getElementById("userval").innerHTML="Username must be 8 characters long ";
		//exit()
	}
	else{
		document.getElementById("userval").innerHTML="";
		//exit()
	}
}
var checkpsw = function(){
	var passw=  /^[A-Za-z]\w{7,14}$/; 
	if(document.getElementById('psw').value.length <8){
		document.getElementById("pswval").innerHTML="Password must be 8 characters long";
		//exit()
	}
	else{
		document.getElementById("pswval").innerHTML="";
		//exit()
	}
	if(document.getElementById('psw').value.match(passw))   { 
		document.getElementById("pswval").innerHTML="";
		//exit()
	}  
	else  
	{   
		document.getElementById("pswval").innerHTML="First character must be an alphabet";  
		//exit()
	}  
}
var checkpswr = function(){
	if (document.getElementById('psw').value !=
		document.getElementById('psw-repeat').value) {
		document.getElementById("psw-repeatval").innerHTML="Passwords do not match!";
		//exit()
	}
	else{
		document.getElementById("psw-repeatval").innerHTML="";
	}
}
