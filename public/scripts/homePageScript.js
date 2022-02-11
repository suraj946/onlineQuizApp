let btnPlay = document.getElementById("btnPlay");
let replayBtn = document.getElementById("replayBtn");
let nextQuestionBtn = document.getElementById("nextQuestion");
let questionElem = document.getElementById("question");
let optionsLabel = document.querySelectorAll(".options label");
let radioBtns = document.querySelectorAll("input[type='radio'][name='option']");
let quizContent = document.querySelector(".quizContent");
let inputFields = document.querySelector(".inputFields");
let noOfQuestions = document.querySelector("#noOfQuestions");
let resultContainer = document.querySelector(".resultContainer");
let summaryElem = document.querySelector(".summary");
let resultText = document.getElementById("resultText");
let data;
let finalAnswers = [];

let startQuiz = function(data){
    inputFields.style.display = "none";
    quizContent.style.display = "block";
    let options = data[data.index].options.split(",");
    questionElem.textContent = data[data.index].questions;
    optionsLabel.forEach((elem, i)=>{
        elem.textContent = options[i];
        radioBtns[i].setAttribute("value", options[i]);
        radioBtns[i].setAttribute("qId", data[data.index].questionId);
        radioBtns[i].checked = false;
    })
    data.index++;
}

let showMessage = function(bgColor, message){
    let msgElement = document.querySelector(".message")
    msgElement.textContent = message;
    msgElement.style.cssText = `background-color:${bgColor}; opacity:${1}`;  
    setTimeout(()=>{
        msgElement.style.opacity = 0;  
    }, 3000);
}

let showSummary = function(answers){
    let score = 0;
    quizContent.style.display = "none";
    answers.forEach((elem)=>{
        let elemToAppend = document.createElement("div");
        let str = `<p>${elem.question}</p>
                   <span>Your answer : ${elem.userAns}</span>
                   <span>Right answer : ${elem.rightAns}</span>`
        elemToAppend.classList.add("questionSummary");
        elemToAppend.innerHTML = str;
        if(elem.userAns == elem.rightAns){
            score += 1;
            elemToAppend.classList.add("right");
        }else{
            elemToAppend.classList.add("wrong");
        }
        summaryElem.append(elemToAppend);
    })
    resultText.textContent = `You have scored ${score} out of ${answers.length}`;
    resultContainer.style.display = "flex";
}

btnPlay.addEventListener('click', async () => {
    if(!noOfQuestions.value){
        showMessage("red", "Please specify the number of questions!!!");
        return;
    }
    let toBeSent = { number: parseInt(noOfQuestions.value)};
    let response = await fetch("/questions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toBeSent)
    });
  data = await response.json();
  data.index = 0;
  data.totalQuestion = parseInt(noOfQuestions.value);
  startQuiz(data);
})

nextQuestionBtn.addEventListener('click', function(){
    let isChecked = document.querySelector("input[type='radio'][name='option']:checked");
    if(isChecked){
        qId = isChecked.getAttribute("qId");
    }else{
        showMessage("red", "Please select an answer!!!");
        return;
    }
    let ansObj = {
        userAns : isChecked.value,
        rightAns : data.find(({questionId})=> questionId==qId).answer,
        question : data.find(({questionId})=> questionId==qId).questions
    }
    finalAnswers.push(ansObj);
    if(data.index === data.totalQuestion-1){
        nextQuestionBtn.textContent = "Results";
    }
    if(data.index < data.totalQuestion){
        setTimeout(()=>{
            startQuiz(data);
        }, 100);
    }else{
        showSummary(finalAnswers);
    }
})

replayBtn.addEventListener('click', ()=>{
    summaryElem.innerHTML = "";
    resultText.textContent = "";
    resultContainer.style.display = "none";
    finalAnswers = [];
    inputFields.style.display = "flex";
    nextQuestionBtn.textContent = "Next Question";
})