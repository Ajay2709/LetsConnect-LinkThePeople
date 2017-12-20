
function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("psw").value;
    data = {"email":email , "password":password};

    $.ajax({
    url:'loginUserService',
    headers:{ 
        "Content-Type":"application/json"
    },
    type: 'POST',
    data: JSON.stringify(data),
        success: function (data) {

            if(data.status == "success"){
                window.location = "/post";    
            }else{
                Console.log("Password/Email is incorrect");
            }


        },
        error: function(data) {
            console.log("failure");
        }

    });
    return false;
}
