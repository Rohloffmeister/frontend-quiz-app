const categoryButtons = document
  .getElementById("categoryButtons")
  .getElementsByTagName("button");
const mainMenu = document.getElementById("main-menu");
const quizMenu = document.getElementById("quiz-menu");
let json = null;
let currentQuizData = null;

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

function category(event) {
  
  switch (event.target.id) {
    case "SELECT-HTML":
      preloadQuiz("HTML");

      break;

    case "SELECT-CSS":
      preloadQuiz("CSS");

      break;
      case "SELECT-JS":
        preloadQuiz("JavaScript");
  
        break;
        case "SELECT-ACCESSIBILITY":
          preloadQuiz("Accessibility");
    
          break;
  }
}

function preloadQuiz(title) {
    for(const key in json["quizzes"]){
      
      if (json["quizzes"][key]["title"] == title){
        currentQuizData = json["quizzes"][key];
        console.log(currentQuizData);
      }
    }
  
  }

function loadQuiz(data,questionNumber){
  
}