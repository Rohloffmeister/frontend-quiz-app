const categoryButtons = document.getElementById("categoryButtons").getElementsByTagName("button");
const mainMenu = document.getElementById("main-menu");
const quizMenu = document.getElementById("quiz-menu");
let quizData = null;


fetch("./data.json").
then((response) => {
  if (!response.ok) {
    throw new Error("Oops! Etwas ist schiefgelaufen.");
  }
  return response.json();
}).
then((data) => {
  quizData = data;
}).
catch((error) => {
  console.error("Fehler beim Laden der Daten:", error);
});




for(let element of categoryButtons){
    
    element.addEventListener("click",function(event){
        category(event);
    });
}


function category(event){
    console.log(event.target.id);
    switch(event.target.id){
        case "SELECT-CSS": 
            console.log(console.log(quizData));

            break;
    }
}