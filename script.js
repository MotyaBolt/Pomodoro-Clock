// default
let breakLength = document.getElementById('break-length');
breakLength.innerHTML = 5;
let sessionLength = document.getElementById('session-length');
sessionLength.innerHTML = 25;
let timerMinutes = 25;
let timerSeconds = '00';
let timerDisplay = document.getElementById('time-left');
timerDisplay.innerHTML = timerMinutes + ':' + timerSeconds;
let time = 0;
let timeIsRunning = false;
let breakIsRunning = false;
let startingMinutes = 0;
let minutes = 0;
let seconds = 0;
let startTimerCount = 0;
let startBreakTime = 0;
let timerHeader = document.getElementById('timer-label');
let clockSound = document.getElementById('beep');
let nullDisplay = false;
let design = false;

// buttons
let breakDecrementButton = document.getElementById('break-decrement');
let breakIncrementButton = document.getElementById('break-increment');
let sessionDecrementButton = document.getElementById('session-decrement');
let sessionIncrementButton = document.getElementById('session-increment');
let resetButton = document.getElementById('reset');

// break settings
function breakDecrement() {
  let defaultBreak = breakLength.innerHTML;
  if (breakLength.innerHTML !== '1' && minutes === 0 && seconds === 0) {
    defaultBreak--;
    breakLength.innerHTML = defaultBreak;
  }
}
function breakIncrement() {
  let defaultBreak = breakLength.innerHTML;
  if (breakLength.innerHTML !== '60' && minutes === 0 && seconds === 0) {
    defaultBreak++;
    breakLength.innerHTML = defaultBreak;
  }
}
breakDecrementButton.addEventListener('click', breakDecrement);
breakIncrementButton.addEventListener('click', breakIncrement);

// session settings
function sessionDecrement() {
  let defaultSession = sessionLength.innerHTML;
  let defaultMinutes = timerMinutes;
  if (
    sessionLength.innerHTML !== '1' &&
    timerMinutes !== 1 &&
    minutes === 0 &&
    seconds === 0
  ) {
    defaultSession--;
    defaultMinutes--;
    sessionLength.innerHTML = defaultSession;
    if (defaultMinutes < 10) {
      timerMinutes = '0' + defaultMinutes;
      timerDisplay.innerHTML = timerMinutes + ':' + timerSeconds;
    } else {
      timerMinutes = defaultMinutes;
      timerDisplay.innerHTML = timerMinutes + ':' + timerSeconds;
    }
  }
}

function sessionIncrement() {
  let defaultSession = sessionLength.innerHTML;
  let defaultMinutes = timerMinutes;
  if (
    sessionLength.innerHTML !== '60' &&
    timerMinutes !== 60 &&
    minutes === 0 &&
    seconds === 0
  ) {
    defaultSession++;
    defaultMinutes++;
    sessionLength.innerHTML = defaultSession;
    if (defaultMinutes < 10) {
      timerMinutes = '0' + defaultMinutes;
      timerDisplay.innerHTML = timerMinutes + ':' + timerSeconds;
    } else {
      timerMinutes = defaultMinutes;
      timerDisplay.innerHTML = timerMinutes + ':' + timerSeconds;
    }
  }
}
sessionDecrementButton.addEventListener('click', sessionDecrement);
sessionIncrementButton.addEventListener('click', sessionIncrement);

// reset
function resetAll() {
  clearInterval(startTimerCount);
  clearInterval(startBreakTime);
  breakLength.innerHTML = 5;
  sessionLength.innerHTML = 25;
  timerMinutes = 25;
  timerSeconds = '00';
  timerHeader.innerHTML = 'Session';
  timerDisplay.innerHTML = timerMinutes + ':' + timerSeconds;
  timeIsRunning = false;
  breakIsRunning = false;
  minutes = 0;
  seconds = 0;
  if (!clockSound.paused) {
    clockSound.pause();
    clockSound.currentTime = 0;
  }
  $('#play-icon').removeClass('fas fa-pause');
  $('#play-icon').addClass('fas fa-play');
}
resetButton.addEventListener('click', resetAll);

//timer
let startStopButton = document.getElementById('start_stop');
startStopButton.addEventListener('click', startTimer);

function startTimer() {
  if (minutes === 0 && seconds === 0 && breakIsRunning === false) {
    startingMinutes = timerMinutes;
    time = startingMinutes * 60;
  }
  if (timeIsRunning === false && breakIsRunning === false) {
    startTimerCount = setInterval(timerSettings, 1000);
    timeIsRunning = true;
    $('#play-icon').removeClass('fas fa-play');
    $('#play-icon').addClass('fas fa-pause');
  } else if (timeIsRunning === true && breakIsRunning === false) {
    clearInterval(startTimerCount);
    timeIsRunning = false;
    $('#play-icon').removeClass('fas fa-pause');
    $('#play-icon').addClass('fas fa-play');
  } else if (breakIsRunning === true && timeIsRunning === false) {
    clearInterval(startBreakTime);
    timeIsRunning = true;
    $('#play-icon').removeClass('fas fa-pause');
    $('#play-icon').addClass('fas fa-play');
  } else {
    startBreakTime = setInterval(breakSettings, 1000);
    timeIsRunning = false;
    $('#play-icon').removeClass('fas fa-play');
    $('#play-icon').addClass('fas fa-pause');
  }
}

function timerSettings() {
  time--;
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  if (nullDisplay === true) {
    timerDisplay.innerHTML = timerMinutes + ':' + timerSeconds;
    nullDisplay = false;
    time++;
  } else if (minutes < 10 && seconds >= 10 && nullDisplay === false) {
    timerDisplay.innerHTML = '0' + minutes + ':' + seconds;
  } else if (seconds < 10 && minutes >= 10 && nullDisplay === false) {
    timerDisplay.innerHTML = minutes + ':' + '0' + seconds;
  } else if (seconds < 10 && minutes < 10 && nullDisplay === false) {
    timerDisplay.innerHTML = '0' + minutes + ':' + '0' + seconds;
  } else if (nullDisplay === false) {
    timerDisplay.innerHTML = minutes + ':' + seconds;
  }
  if (time <= 0) {
    timeIsRunning = false;
    breakIsRunning = true;
    clockSound.play();
    timerHeader.innerHTML = 'Break';
    startingMinutes = breakLength.innerHTML;
    time = startingMinutes * 60;
    clearInterval(startTimerCount);
    startBreakTime = setInterval(breakSettings, 1000);
  }
}

function breakSettings() {
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  if (minutes < 10 && seconds >= 10) {
    timerDisplay.innerHTML = '0' + minutes + ':' + seconds;
  } else if (seconds < 10 && minutes >= 10) {
    timerDisplay.innerHTML = minutes + ':' + '0' + seconds;
  } else if (seconds < 10 && minutes < 10) {
    timerDisplay.innerHTML = '0' + minutes + ':' + '0' + seconds;
  } else {
    timerDisplay.innerHTML = minutes + ':' + seconds;
  }
  time--;
  if (time < 0) {
    timeIsRunning = true;
    breakIsRunning = false;
    clockSound.play();
    timerHeader.innerHTML = 'Session';
    startingMinutes = timerMinutes;
    time = startingMinutes * 60;
    clearInterval(startBreakTime);
    if (timerDisplay.innerHTML === '00' + ':' + '00') {
      nullDisplay = true;
    }
    startTimerCount = setInterval(timerSettings, 1000);
  }
}
