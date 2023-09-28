import { API_TOKEN } from "./config.js";

const questionsList = async () => {
  try {
    const url = `https://quizapi.io/api/v1/questions?apiKey=${API_TOKEN}&category=code&difficulty=Easy&limit=5`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let questions;
let score = 0;
async function startQuiz() {
  questions = await questionsList();
  currentQuestionIndex = 0;
  score = 0;
  nextButtton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestion);
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  Object.keys(currentQuestion.answers).forEach((key) => {
    if (currentQuestion.answers[key] != null) {
      const button = document.createElement("button");
      button.innerText = currentQuestion.answers[key];
      button.classList.add("btn");
      answerButtons.appendChild(button);
      const correct_key = `${key}_correct`;
      // console.log(correct_key,currentQuestion,currentQuestion.correct_answers);
      // console.log(currentQuestion.correct_answers[correct_key]);
      if (currentQuestion.correct_answers[correct_key]) {
        button.dataset.correct = currentQuestion.correct_answers[correct_key];
      }
      button.addEventListener("click", selectAnswer);
    }
  });
}

function resetState() {
  nextButtton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  console.log(selectedBtn.dataset.correct, typeof selectedBtn.dataset.correct);
  console.log(isCorrect, typeof isCorrect);
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButtton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButtton.innerHTML = "Play Again";
  nextButtton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButtton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
