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
function startQuestionTimer(difficulty, onTimeUp) {
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
      if (typeof onTimeUp === "function") {
        onTimeUp(); // vai alla prossima domanda
      }
    }
  }, 1000);
}

// --------------------
// UPDATE TIMER UI
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
// STOP TIMER (OPTIONAL)
// --------------------
function stopQuestionTimer() {
  clearInterval(timerInterval);
}
