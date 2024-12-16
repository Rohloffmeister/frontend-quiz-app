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
const categoryImg = document.getElementsByClassName("category-img");
const questionNumber = document.getElementById("questionNumber");
const answerOptionsText = document.getElementsByClassName("answer-options");
const quizResults = document.getElementById("quizResults");
const progressBar = document.getElementById("progressBar");
const noAnswerError = document.getElementById("noAnswerError");
const categoryTitles = document.getElementsByClassName("categoryTitle");
const resultCorrect = document.getElementById("resultCorrect");
const resultMax = document.getElementById("resultMax");
const replayButton = document.getElementById("replay");
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
replayButton.addEventListener("click", function () {
  restart();
});
submitButton.addEventListener("click", function () {
  submitAnswer();
});

function category(event) {
  switch (event.target.id) {
    case "SELECT-HTML":
      preloadQuiz("HTML");
      for (img of categoryImg) {
        img.classList.remove(
          "html",
          "css",
          "javascript",
          "accessibility",
          "notactive"
        );
        img.classList.add("html");
      }

      break;

    case "SELECT-CSS":
      preloadQuiz("CSS");
      for (img of categoryImg) {
        img.classList.remove(
          "html",
          "css",
          "javascript",
          "accessibility",
          "notactive"
        );
        img.classList.add("css");
      }

      break;
    case "SELECT-JS":
      preloadQuiz("JavaScript");

      for (img of categoryImg) {
        img.classList.remove(
          "html",
          "css",
          "javascript",
          "accessibility",
          "notactive"
        );
        img.classList.add("javascript");
      }

      break;
    case "SELECT-ACCESSIBILITY":
      preloadQuiz("Accessibility");

      for (img of categoryImg) {
        img.classList.remove(
          "html",
          "css",
          "javascript",
          "accessibility",
          "notactive"
        );
        img.classList.add("accessibility");
      }

      break;
  }
  for (x of categoryTitles) {
    
    x.textContent = currentQuizData["title"];
  }
}

function preloadQuiz(category) {
  for (const key in json["quizzes"]) {
    if (json["quizzes"][key]["title"] == category) {
      currentQuizData = json["quizzes"][key];
    }
  }
  for (img of categoryImg) {
    img.src = currentQuizData["icon"];
  }

  quizLength = currentQuizData["questions"].length;

  mainMenu.classList.toggle("notactive");
  quizMenu.classList.toggle("notactive");
  loadQuestion(category);
}

function loadQuestion() {
  progress = (currentQuestionNumber / quizLength) * 100;

  progressBar.style.width = progress.toString().concat("%");
  console.log(progress.toString().concat("%"));
  submitButton.textContent = "Submit Answer";
  questionNumber.textContent = currentQuestionNumber;
  quizQuestion.textContent =
    currentQuizData["questions"][currentQuestionNumber - 1]["question"];

  let itt = 0;
  for (let x of answerButtons) {
    x.querySelector("p").textContent =
      currentQuizData["questions"][currentQuestionNumber - 1]["options"][itt];

    if (
      x.querySelector("p").textContent ==
      currentQuizData["questions"][currentQuestionNumber - 1]["answer"]
    ) {
      correctAnswerButton = x;
    }
    itt += 1;
  }
}
function changeAnswer(event) {
  selectedAnswerButton = event.currentTarget;
  console.log(selectedAnswerButton);
  for (let element of answerButtons) {
    element.classList.remove("selected");
  }
  event.currentTarget.classList.add("selected");
}

function submitAnswer() {
  if (selectedAnswerButton == null) {
    noAnswerError.classList.remove("notactive");
    return;
  }
  if (submitButton.textContent == "Submit Answer") {
    noAnswerError.classList.add("notactive");
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
      correctAnswerButton.querySelector("img").src =
        "./assets/images/icon-correct.svg";
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
  resultMax.textContent = quizLength;
  resultCorrect.textContent = correctAnswerCount;
  quizMenu.classList.add("notactive");
  quizResults.classList.remove("notactive");
}

function restart() {
  quizResults.classList.add("notactive");
  mainMenu.classList.remove("notactive");
  selectedAnswerButton = null;
  correctAnswerCount = 0;
  currentQuestionNumber = 1;
  for (img of categoryImg) {
    img.src = "";
  }
  for (x of categoryTitles) {
    x.textContent = "";
  }
}
