var userScore = 0;
var userResponse = 0;
var correctAnswer;

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
  //shuffles correct answer
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
    answer.parentElement.classList.remove("wrong", "correct");
    answer.innerHTML = answers[index];
  });
};

//fetch data
var url = "https://opentdb.com/api.php?amount=1";
var category = 31;
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
  try {
    console.log("making request to api")
    const response = await makeRequest();
    console.log("response received");
    insertQuestion(response.results[0]);
    console.log("question updated");
    quizContainer.classList.remove("loading");
  } catch (error) {
    console.log(`${error} fetching data`);
    updateHTML();
  }
}

//check user response
const ansList = document.querySelector(".answerList");
const selectors = ansList.querySelectorAll("input");
ansList.addEventListener("click", (e) => {
  let targetId = parseInt(e.target.id);
  userResponse = parseInt(targetId);
  selectors[targetId].checked = "true";
});

//button behaviour
const buttonEl = document.querySelector(".submitAns");
buttonEl.addEventListener("click", () => {
  if (userResponse === correctAnswer) {
    answersEl[userResponse].parentElement.classList.add("correct");
    console.log("user submited correct answer");
    userScore++;
  } else {
    console.log("user submited wrong answer");
    answersEl[userResponse].parentElement.classList.add("wrong");
    userScore > 0 ? userScore-- : (userScore = 0);
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

//choose difficulty
const btnsContainer = document.querySelector(".difficulty .buttons");
const btns = btnsContainer.querySelectorAll('button');
btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
    difficulty = e.currentTarget.id;
    btns.forEach((btn) => { 
        if (btn.id !== difficulty) btn.classList.add('hide');
        else btn.classList.add('show');
    })
    btnsContainer.parentElement.classList.remove('active');
    quizContainer.classList.remove('unfocus');
    updateHTML();
  });
});

//app start
quizContainer.classList.add('loading');
quizContainer.classList.add('unfocus');
