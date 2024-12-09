const categoryButtons = document
  .getElementById("categoryButtons")
  .getElementsByClassName("answer");
const answerButtons = document
  .getElementById("answerButtons")
  .getElementsByTagName("button");
const mainMenu = document.getElementById("main-menu");
const quizMenu = document.getElementById("quiz-menu");
const quizQuestion = document.getElementById("quiz-question");
const headerImg = document.getElementById("header-img");
let json = null;
let currentQuizData = null;
let quizLength = null;
let currentQuestionNumber = null;
console.log("test");
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
    answer(event);
  });
}

function category(event) {
  console.log(event.target.id);
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

function preloadQuiz(title) {
  for (const key in json["quizzes"]) {
    if (json["quizzes"][key]["title"] == title) {
      currentQuizData = json["quizzes"][key];
      console.log(currentQuizData["icon"]);
    }
  }
  headerImg.src = currentQuizData["icon"];
  quizLength = currentQuizData["questions"].length;
  console.log(quizLength);
  mainMenu.classList.toggle("notactive");
  quizMenu.classList.toggle("notactive");
}

function loadQuiz(data, questionNumber) {}
function answer(event) {}
