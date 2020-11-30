"use strict"

const container = document.querySelector('.container');
const title = document.querySelector('.welcome-text');
const startBtn = document.querySelector('.start-quiz-btn');
const questionBox = document.querySelector('.question-box-hide');

//Start quiz
startBtn.addEventListener('click', () => {
    title.classList.add('welcome-text-hide');
    startBtn.classList.add('start-quiz-hide-btn');
    setTimeout(() => questionBox.classList.add('question-box-show'), 600);
})

//Główny program
const xhr = new XMLHttpRequest();
xhr.open('GET', 'questions.json');
xhr.responseType = 'json';
xhr.send();
xhr.addEventListener('load', () => {
    const title = xhr.response.title;
    const questions = xhr.response.questions;
    const quizTitle = document.createElement('h1');
    quizTitle.classList.add('quiz-title')
    quizTitle.textContent = title;
    questionBox.appendChild(quizTitle);

    // Generowanie pytań i inputów
    for(let i = 1; i < questions.length + 1; i++) {
        const { q, a } = questions[i - 1];
        const questionText = document.createElement('h3');
        questionText.classList.add(`question-text${i}`);
        questionText.textContent = q;
        questionBox.appendChild(questionText);
        const answerInput = document.createElement('input');
        answerInput.classList.add(`answer-input${i}`)
        questionBox.appendChild(answerInput);
    }
    
    const checkAnswersBtn = document.createElement('button');
    checkAnswersBtn.classList.add('check-answer-btn')
    checkAnswersBtn.textContent = 'Sprawdź odpowiedzi!';
    questionBox.appendChild(checkAnswersBtn);

    //Sprawdzanie odpowiedzi
    checkAnswersBtn.addEventListener('click', () => {
        let score = 0;
        for(let i = 1; i < questions.length + 1; i++) {
            const userAnswer = document.querySelector(`.answer-input${i}`)
            const { q: question, a: goodAnswer } = questions[i - 1];
            if(userAnswer.value.toLowerCase() === goodAnswer.toLowerCase()) {
                score+=1;
                userAnswer.style.borderColor = 'rgb(39, 233, 39)';
            } else {
                userAnswer.style.borderColor = 'rgb(199, 38, 78)';
            }
        }
        if(score !== questions.length) {
            container.style.backgroundColor = 'rgb(199, 38, 78)';
            setTimeout(() => alert(`Twój wynik to ${score}/${questions.length}. Spróbuj poprawić swoje odpowiedzi!`), 500)
        } else {
            container.style.backgroundColor = 'rgb(255, 174, 0)';
            setTimeout(() => alert(`Twój wynik to ${score}/${questions.length}. Gratulacje!`), 500)
        }
    })
});