
$(function(){

    let showMessage = function(bgColor, message){
        let msgElement = $(".message");
        msgElement.text(message);
        msgElement.css({"background-color":bgColor, "opacity":1});  
        if(bgColor == '#ff0000'){
            setTimeout(()=>{
                msgElement.css({"opacity":0});  
            }, 3000);
        }
    }

    $("#registerForm").validate({
        rules:{
            fname:{
                required:true,
                minlength:2
            },
            lname:{
                required:true,
                minlength:2
            },
            userName:{
                required:true,
                minlength:6
            },
            password:{
                required:true,
                minlength:8
            },
            confirmPassword:{
                required:true,
                equalTo:"#password"
            }
        },
        submitHandler:function(e){
            let formData = {};
            formData.fname = $("#fname").val();
            formData.lname = $("#lname").val();
            formData.username = $("#userName").val();
            formData.password = $("#password").val();
            $.ajax({
                type:'post',
                url:'/register',
                dataType:'json',
                contentType:'application/json',
                data:JSON.stringify(formData),
                success:function(isDone){
                    if(isDone){
                        let msg = "Registration done please login by clicking the login button below.";
                        showMessage("#078f07", msg);
                        $("#registerForm").trigger("reset");
                    }else{
                        let msg = "This username has already been taken, try other.";
                        $("#userName").focus();
                        showMessage("#ff0000", msg);

                    }
                }
            })
            return false;
        }
    });

    $("#hideShow").on('click', ()=>{
        if($("#hideShow").html() == "Show"){
            $("#password").attr("type", "text");
            $("#confirmPassword").attr("type", "text");
            $("#hideShow").html("Hide");
        }else{
            $("#password").attr("type", "password");
            $("#confirmPassword").attr("type", "password");
            $("#hideShow").html("Show");
        }
    });  
});
