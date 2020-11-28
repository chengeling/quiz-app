"use strict"

const container = document.querySelector('.container');
const title = document.querySelector('.welcome-text');
const startBtn = document.querySelector('.start-quiz-btn');
const questionBox = document.querySelector('.question-box-hide');
const nextQuestion = document.querySelector('.next-question-btn');
const prevQuestion = document.querySelector('.prev-question-btn');


function startQuiz() {
    title.classList.add('welcome-text-hide');
    startBtn.classList.add('start-quiz-hide-btn');
    setTimeout(() => questionBox.classList.add('question-box-show'), 600);
}

function getQuestions() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'questions.json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', () => {
        return xhr.response.questions;
    })
}

startBtn.addEventListener('click', startQuiz)

let data = getQuestions();
console.log(data)
