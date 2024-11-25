const categoryButtons = document.getElementById("categoryButtons").getElementsByTagName("button");
const mainMenu = document.getElementById("main-menu");
const quizMenu = document.getElementById("quiz-menu");


console.log(categoryButtons);

for(let element of categoryButtons){
    console.log(element);
    element.addEventListener("click",function(event){
        category(event);
    });
}


function category(event){
    console.log(event.target.id);
    switch(event.target.id){
        case "SELECT-CSS": console.log("test");
    }
}