console.log("Its working");
 let showMessage = function(bgColor, message){
    let msgElement = $(".message");
    msgElement.text(message);
    msgElement.css({"background-color":bgColor, "opacity":1});  
    setTimeout(()=>{
        msgElement.css({"opacity":0});  
    }, 3000);
}

//add and update function
const addUpdateFunc = async(formId, url)=>{
    let formData = $(`#${formId}`).serialize();
    const response = await fetch(url, {
        method:"POST",
        body:new URLSearchParams(formData)
    });
    return await response.json();
}

//for updating dom after adding question to database
const addOnDom = (data)=>{
    let tbody = document.getElementById("tableBody");
    let element = $('<tr>', {id:`tr-id-${data.id}`});
    let SN = parseInt(tbody.lastElementChild.firstElementChild.textContent)+1;
    let str = ` <td>${SN}</td>
                <td class="forUpdate">${data.id}</td>
                <td class="forUpdate">${data.question}</td>
                <td class="forUpdate">${data.options}</td>
                <td class="forUpdate">${data.answer}</d>
                <td><button class="editBtn myBtn" id="edit-${data.id}" qId="${data.id}">Edit Question</button></td>
                <td><button class="deleteBtn myBtn" id="delete-${data.id}" qId="${data.id}">Delete</button></td>`
    element.html(str);
    tbody.append(element[0]);
}

//for updating dom after updating question to database
const updateOnDom = (data)=>{
    $("#modalBoxClose").click();
    let elementToBeUpdate = document.getElementById(`tr-id-${data.id}`)
    let SN = elementToBeUpdate.firstElementChild.textContent
    let str = ` <td>${SN}</td>
                <td class="forUpdate">${data.id}</td>
                <td class="forUpdate">${data.question}</td>
                <td class="forUpdate">${data.options}</td>
                <td class="forUpdate">${data.answer}</d>
                <td><button class="editBtn myBtn" id="edit-${data.id}" qId="${data.id}">Edit Question</button></td>
                <td><button class="deleteBtn myBtn" id="delete-${data.id}" qId="${data.id}">Delete</button></td>`
    elementToBeUpdate.innerHTML = str;
}

$("#addQuestionBtn").on('click', async()=>{
    if($("#questionInp").val() === "" || $("#optionInp").val() === "" || $("#answerInp").val() === ""){
        showMessage("#ff0000", "Feilds cannot be empty");
        return;
    }
    const result = await addUpdateFunc("addQuestionForm", "/addUpdateQuestion"); 
    if(result.success){
        showMessage("#078f07", "Question added successfully");
        $("#addQuestionForm").trigger("reset");
        addOnDom(result.data);
    }else{
        showMessage("#ff0000", "Something went wrong");
    }
    
});

$("#tableBody").on('click', '.editBtn', (e)=>{
     const values = e.target.closest('tr').querySelectorAll(".forUpdate");
     $("#storeQuesId").val(values[0].innerText);
     $("#updateQuestion").val(values[1].innerText);
     $("#updateOptions").val(values[2].innerText);
     $("#updateAnswer").val(values[3].innerText);
     $('#modalBoxOpen').click();
})

$("#updateApiAndDom").on('click', async()=>{
    if($("#updateQuestion").val() === "" || $("#updateOptions").val() === "" || $("#updateAnswer").val() === ""){
        $("#modalBoxClose").click();
        $("#modalForm").trigger("reset");
        showMessage("#ff0000", "Feilds cannot be empty");
        return;
    }
    const result = await addUpdateFunc("modalForm", "/addUpdateQuestion"); 
    if(result.success){
        showMessage("#078f07", "Question updated successfully");
        $("#modalForm").trigger("reset");
        updateOnDom(result.data);
    }else{
        showMessage("#ff0000", "Something went wrong");
    }
})

$("#tableBody").on('click', '.deleteBtn', async(e)=>{
    const element = e.target;
    const id = parseInt(element.attributes.qId.nodeValue);
    const response = await fetch("/deleteQuestion", {
        method:"DELETE",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
    });
    const json = await response.json();
    if(json.success){
        element.closest("tr").remove();
        showMessage("#078f07", "Question deteled successfully")
    }else{
        showMessage("#ff0000", "Something went wrong");
    }
});
