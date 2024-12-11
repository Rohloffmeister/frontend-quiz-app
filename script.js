const categoryButtons = document
  .getElementById("categoryButtons")
  .getElementsByClassName("categoryButton");
const answerButtons = document
  .getElementById("answerButtons")
  .getElementsByClassName("answer");
const submitButton = document.getElementById("submit");
const mainMenu = document.getElementById("main-menu");
const quizMenu = document.getElementById("quiz-menu");
const quizQuestion = document.getElementById("quiz-question");
const headerImg = document.getElementById("header-img");
const questionNumber = document.getElementById("questionNumber");
const answerOptionsText = document.getElementsByClassName("answer-options");
let json = null;
let currentQuizData = null;
let correctAnswerButton = null;
let quizLength = null;
let currentQuestionNumber = 1;
let selectedAnswerButton = null;
let correctAnswerCount = 0;

fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Oops! Etwas ist schiefgelaufen.");
    }
    return response.json();
  })
  .then((data) => {
    json = data;
  })
  .catch((error) => {
    console.error("Fehler beim Laden der Daten:", error);
  });

for (let element of categoryButtons) {
  element.addEventListener("click", function (event) {
    category(event);
  });
}
for (let element of answerButtons) {
  element.addEventListener("click", function (event) {
    if (submitButton.textContent == "Submit Answer") {
      changeAnswer(event);
    }
  });
}

submitButton.addEventListener("click", function () {
  submitAnswer();
});

function category(event) {
  switch (event.target.id) {
    case "SELECT-HTML":
      preloadQuiz("HTML");
      headerImg.className = "";
      headerImg.classList.add("html");

      break;

    case "SELECT-CSS":
      preloadQuiz("CSS");
      headerImg.className = "";
      headerImg.classList.add("css");

      break;
    case "SELECT-JS":
      preloadQuiz("JavaScript");

      headerImg.className = "";
      headerImg.classList.add("javascript");

      break;
    case "SELECT-ACCESSIBILITY":
      preloadQuiz("Accessibility");

      headerImg.className = "";
      headerImg.classList.add("accessibility");

      break;
  }
}

function preloadQuiz(category) {
  for (const key in json["quizzes"]) {
    if (json["quizzes"][key]["title"] == category) {
      currentQuizData = json["quizzes"][key];
    }
  }
  headerImg.src = currentQuizData["icon"];
  quizLength = currentQuizData["questions"].length;

  mainMenu.classList.toggle("notactive");
  quizMenu.classList.toggle("notactive");
  loadQuestion(category);
}

function loadQuestion() {
 
  submitButton.textContent = "Submit Answer";
  questionNumber.textContent = currentQuestionNumber;
  quizQuestion.textContent =
    currentQuizData["questions"][currentQuestionNumber - 1]["question"];

  let itt = 0;
  for (let x of answerButtons) {
    x.querySelector("p").textContent =
      currentQuizData["questions"][currentQuestionNumber - 1]["options"][itt];
    

    if( x.querySelector("p").textContent == currentQuizData["questions"][currentQuestionNumber - 1]["answer"]){
     correctAnswerButton = x;
    }
      itt += 1;
  }
  
}
function changeAnswer(event) {
  selectedAnswerButton = event.currentTarget;

  for (let element of answerButtons) {
    element.classList.remove("selected");
  }
  event.currentTarget.classList.add("selected");
}

function submitAnswer() {
  if (selectedAnswerButton.querySelector("p").textContent == "") {
    return;
  }
  if (submitButton.textContent == "Submit Answer") {
    for (x of answerButtons) {
      x.classList.remove("hover");
    }
    if (
      selectedAnswerButton.querySelector("p").textContent ==
      currentQuizData["questions"][currentQuestionNumber - 1]["answer"]
    ) {
      correctAnswerCount += 1;

      selectedAnswerButton.classList.add("correct");
      selectedAnswerButton.querySelector("img").src =
        "./assets/images/icon-correct.svg";
    } else {
      selectedAnswerButton.classList.add("incorrect");
      correctAnswerButton.querySelector("img").src = "./assets/images/icon-correct.svg";
      selectedAnswerButton.querySelector("img").src =
        "./assets/images/icon-incorrect.svg";
    }
    if (currentQuestionNumber <= quizLength - 1) {
      submitButton.textContent = "Next Question";
    } else {
      submitButton.textContent = "See Results";
    }
  } else {
    currentQuestionNumber += 1;
    for (x of answerButtons) {
      x.querySelector("img").src = "";
      x.classList.remove("selected", "correct", "incorrect");
      x.classList.add("hover");
    }
    if (currentQuestionNumber <= quizLength) {
      selectedAnswerButton = null;

      loadQuestion();
    } else {
      loadResults();
    }
  }
}

function loadResults() {
  alert(correctAnswerCount);
}
