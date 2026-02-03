    const questions = [
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
          "Central Process Unit",
          "Computer Personal Unit",
          "Central Processor Unit",
        ],     
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
          "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
          "Counter Strike: Source",
          "Corrective Style Sheet",
          "Computer Style Sheet",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
          "Ice Cream Sandwich",
          "Jelly Bean",
          "Marshmallow",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
      },
    ];
    
/* TODO: Timer a domanda*/




// -------------------------------------------




  


/* TIMER BOX */
#question-timer {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #222;
  color: #fff;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  z-index: 1000;
  transition: background 0.3s ease;
}







// 3. JavaScript (per-question timer logic)

// --------------------
// QUESTIONS (yours)
// --------------------
const questions = [ /* YOUR QUESTIONS ARRAY HERE */ ];

// --------------------
// STATE
// --------------------
let currentQuestionIndex = 0;
let timerInterval = null;
let timeLeft = 0;
let totalTimeForQuestion = 0;

// --------------------
// TIME BASED ON DIFFICULTY
// --------------------
function getTimeForQuestion(difficulty) {
  switch (difficulty) {
    case "easy":
      return 20;
    case "medium":
      return 40;
    case "hard":
      return 60;
    default:
      return 30;
  }
}

// --------------------
// LOAD QUESTION
// --------------------
function loadQuestion() {
  clearInterval(timerInterval);

  const question = questions[currentQuestionIndex];
  const seconds = getTimeForQuestion(question.difficulty);

  renderQuestion(question);
  startQuestionTimer(seconds);
}

// --------------------
// RENDER QUESTION (simple)
// --------------------
function renderQuestion(question) {
  document.getElementById("question-text").textContent = question.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  const allAnswers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];

  allAnswers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    answersDiv.appendChild(btn);
  });
}

// --------------------
// START TIMER
// --------------------
function startQuestionTimer(seconds) {
  timeLeft = seconds;
  totalTimeForQuestion = seconds;
  updateTimerUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      goToNextQuestion();
    }
  }, 1000);
}

// --------------------
// UPDATE TIMER UI + WARNING COLORS
// --------------------
function updateTimerUI() {
  const timerEl = document.getElementById("question-timer");
  timerEl.textContent = `Time left: ${timeLeft}s`;

  timerEl.classList.remove("warning", "critical");

  const percentLeft = timeLeft / totalTimeForQuestion;

  if (percentLeft <= 0.2) {
    timerEl.classList.add("critical");
  } else if (percentLeft <= 0.4) {
    timerEl.classList.add("warning");
  }
}

// --------------------
// NEXT QUESTION
// --------------------
function goToNextQuestion() {
  clearInterval(timerInterval);
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}


/*
Simple explanation:

• Every question starts its own timer
• Time is set based on difficulty (easy = 20s, etc.)
• Timer is fixed top-right on screen
• When time reaches 0, quiz goes to next question automatically
• When user clicks Proceed, it also goes to next question
• Timer resets for each question
• When time is low:

Orange = hurry

Red + pulse = almost out of time
• Code is split into small functions to make it easy for group members to maintain and extend
*/
