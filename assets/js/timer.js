// ================= TIMER STATE =================

let timerInterval = null;
let timeLeft = 0;
let totalTime = 0;

const FULL_DASH = 376.99; // 2 * PI * 60

// ================= DIFFICULTY MAP =================

function getTimeForQuestion(difficulty = "easy") {
  const times = {
    easy: 30,
    medium: 40,
    hard: 60
  };
  return times[difficulty] || 30;
}

// ================= START TIMER =================

function startQuestionTimer(difficulty = "easy", onTimeUp) {
  clearInterval(timerInterval);

  const container = document.getElementById("quiz-timer");
  const svg = document.querySelector(".quiz-timer-svg");
  if (!container || !svg) return; // Not on quiz page

  totalTime = getTimeForQuestion(difficulty);
  timeLeft = totalTime;

  // RESET ROTATION
  container.classList.remove("quiz-timer-rotating");
  void svg.offsetWidth; // force reflow
  container.classList.add("quiz-timer-rotating");

  // Sync rotation duration
  svg.style.animationDuration = `${totalTime}s`;

  updateTimerUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      onTimeUp && onTimeUp();
    }
  }, 1000);
}

// ================= UPDATE UI =================

function updateTimerUI() {
  const container = document.getElementById("quiz-timer");
  const numberEl = document.getElementById("quiz-timer-number");
  const progressEl = document.querySelector(".quiz-timer-progress");

  if (!container || !numberEl || !progressEl) return;

  numberEl.textContent = timeLeft;

  const percent = timeLeft / totalTime;
  const offset = FULL_DASH * (1 - percent);
  progressEl.style.strokeDashoffset = offset;

  container.classList.remove("warning", "critical");

  if (percent <= 0.2) container.classList.add("critical");
  else if (percent <= 0.4) container.classList.add("warning");
}

// ================= OPTIONAL =================

function stopQuestionTimer() {
  clearInterval(timerInterval);
}


// ================= RICHIAMO PER AUTO-RESET =================


startQuestionTimer("easy", goToNextQuestion);
