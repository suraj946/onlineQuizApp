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

    $("#loginForm").validate({
        rules:{
            username:{
                required:true,
                minlength:6
            },
            password:{
                required:true,
                minlength:8
            }
        },
        submitHandler:function(){
            let formData = $("form").serialize();
            $.ajax({
                type:'post',
                url:'/login',
                data:formData,
                success:function(msg){
                    if(msg != "done"){
                        showMessage("#ff0000", msg);
                    }
                    if(msg === "done"){
                        $("#loginForm").trigger('reset');
                        let hostName = window.location.hostname;
                        let pathName = "/homepage";
                        let protocol = window.location.protocol;
                        window.location.assign(`${protocol}//${hostName}:1300${pathName}`);
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
})