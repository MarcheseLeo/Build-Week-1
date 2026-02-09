//----------- BRANCH JS/TIMER ---------------

/* TODO: Timer a domanda*/




// -------------------------------------------



// --------------------
// TIMER STATE
// --------------------
let timerInterval = null;
let timeLeft = 0;
let totalTimeForQuestion = 0;

// --------------------
// TIME BY DIFFICULTY
// --------------------
function getTimeForQuestion(difficulty) {
  switch (difficulty) {
    case "easy": return 20;
    case "medium": return 40;
    case "hard": return 60;
    default: return 30;
  }
}

// --------------------
// START TIMER (CALL THIS PER QUESTION)
// --------------------
function startQuestionTimer(difficulty) {
  clearInterval(timerInterval);

  const seconds = getTimeForQuestion(difficulty);
  timeLeft = seconds;
  totalTimeForQuestion = seconds;

  updateTimerUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      boxContainer.innerHTML = ""
      nextQuestion()
    }
  }, 1000);
}

// --------------------
// UPDATE TIMER UI
// --------------------
function updateTimerUI() {
  const timerEl = document.getElementById("quiz-timer-number");
  const circle = document.getElementById('quiz-timer')
  timerEl.textContent = `${timeLeft}`;

  circle.classList.remove("warning", "critical");

  const percentLeft = timeLeft / totalTimeForQuestion;

  if (percentLeft <= 0.2) {
    circle.classList.add("critical");
  } else if (percentLeft <= 0.4) {
    circle.classList.add("warning");
  }
}

// --------------------
// STOP TIMER (OPTIONAL)
// --------------------
function stopQuestionTimer() {
  clearInterval(timerInterval);
}
