$(document).ready(()=>{
    console.log("Its working");
    $("#tableBody").on('click', '.updateRoleBtn', async(e)=>{
        const element = e.target;
        const id = parseInt(element.attributes.uId.nodeValue);
        const isAdmin = parseInt(element.attributes.isAdmin.nodeValue);
        const role = isAdmin ? 0 : 1;
        const response = await fetch("/updateuserrole", {
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({id:id, role:role})
        });
        const json = await response.json();
        
        if(json.operation){
            element.textContent = "Make User";
        }else{
            element.textContent = "Make Admin";
        }
        element.parentNode.previousElementSibling.textContent = json.operation;
        element.attributes.isAdmin.nodeValue = json.operation;
    })
});