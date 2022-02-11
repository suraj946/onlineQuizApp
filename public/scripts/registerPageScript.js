
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
            username:{
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
        submitHandler:function(){
            let formData = $("form").serialize();
            $.ajax({
                type:'post',
                url:'/register',
                data:formData,
                success:function(isDone){
                    if(isDone){
                        let msg = "Registration done. Logging in you to QuizHero)";
                        showMessage("#078f07", msg);
                        $("#registerForm").trigger("reset");
                        setTimeout(()=>{
                            let hostName = window.location.hostname;
                            let pathName = "/homepage";
                            let protocol = window.location.protocol;
                            window.location.assign(`${protocol}//${hostName}:1300${pathName}`);
                        }, 1000);
                    }else{
                        let msg = "This username has already been taken, try another.";
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
