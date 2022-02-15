var userScore = 0;
var correctAnswer;
var userResponse = 0;

//insert into html
const quizContainer = document.querySelector(".quiz-container");
const questionEl = document.querySelector(".question h2");
const questionCategoryEl = questionEl.nextElementSibling.querySelector("span");
const answersEl = document.querySelectorAll(".answers ul li > label");
const insertQuestion = (questionData) => {
  //load question
  let question = questionData.question;
  let questionCategory = questionData.category;
  let answers = questionData.incorrect_answers;
  answers.push(questionData.correct_answer);
  //suffles correct answer
  correctAnswer = Math.floor(Math.random() * 4);
  let temp = answers[correctAnswer];
  answers[correctAnswer] = answers[3];
  answers[3] = temp;
  //insert into html
  questionEl.innerHTML = question;
  questionCategoryEl.innerHTML = questionCategory;
  answersEl.forEach((answer, index) => {
    //check first answer by default
    if (index === 0) answer.previousElementSibling.checked = "true";
    answer.style.color = "black";
    answer.innerHTML = answers[index];
  });
};

//fetch data
var url = "https://opentdb.com/api.php?amount=1";
var category = 0;
var type = "multiple";
var difficulty = "";
if (category >= 9 && category <= 32) url += `&category=${category}`;
if (difficulty) url += `&difficulty=${difficulty}`;
if (type) url += `&type=${type}`;
const makeRequest = () => {
  return fetch(url).then((response) => response.json());
};
async function updateHTML() {
  quizContainer.style.pointerEvents = "initial";
  userResponse = 0;
  quizContainer.classList.add("loading");
  const response = await makeRequest();
  console.log("response received");
  insertQuestion(response.results[0]);
  console.log("question updated");
  quizContainer.classList.remove("loading");
}
updateHTML();

//check user response
const ansList = document.querySelector(".answerList");
ansList.addEventListener("click", (e) => {
  if (e.target.id) userResponse = parseInt(e.target.id);
});

//button behaviour
const buttonEl = document.querySelector(".submitAns");
buttonEl.addEventListener("click", () => {
  if (userResponse === correctAnswer) {
    answersEl[userResponse].style.color = "green";
    console.log("user submited correct answer");
    userScore++;
  } else {
    console.log("user submited wrong answer");
    answersEl[userResponse].style.color = "red";
  }
  quizContainer.style.pointerEvents = "none";
  setTimeout(function () {
    nextQuestion();
  }, 1000);
});

//user score
const scoreEl = document.querySelector(".score");
const updateScore = () => {
  console.log("user score updated");
  scoreEl.innerHTML = userScore;
};

//next question
const nextQuestion = () => {
  updateScore();
  updateHTML();
};