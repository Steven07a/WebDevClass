const originText = document.querySelector(".original-text");
const correctText = document.querySelector(".red");
const resetButton = document.querySelector("#reset");
const textButton = document.querySelector("#new-text");
const theTimer = document.querySelector(".timer");
const inputBox = document.querySelector("textarea");
const leaderboard = document.querySelectorAll("#leaderboard-text");

let userInput = [];
let finished = false;
let running = false;
let hundredths = 0,
  seconds = 0,
  minute = 0,
  time = 0;
let loop;
let promptText = [
  'Words per minute (WPM) is a measure of typing speed, commonly used in recruitment. For the purposes of WPM measurement a word is standardized to five characters or keystrokes. Therefore, "brown" counts as one word, but "accounted" counts as two. The benefits of a standardized measurement of input speed are that it enables comparison across language and hardware boundaries. The speed of an Afrikaans-speaking operator in Cape Town can be compared with a French-speaking operator in Paris. (Wikipedia)',
  "Business casual is an ambiguously defined dress code that has been adopted by many professional and white-collar workplaces in Western countries. It entails neat yet casual attire and is generally more casual than informal attire but more formal than casual or smart casual attire. Casual Fridays preceded widespread acceptance of business casual attire in many offices.",
  "Many touch typists also use keyboard shortcuts or hotkeys when typing on a computer. This allows them to edit their document without having to take their hands off the keyboard to use a mouse. An example of a keyboard shortcut is pressing the Ctrl key plus the S key to save a document as they type, or the Ctrl key plus the Z key to undo a mistake. Many experienced typists can feel or sense when they have made an error and can hit the Backspace key and make the correction with no increase in time between keystrokes.",
];
let textIndex = 0;
// on page load run this to change text
document.addEventListener("DOMContentLoaded", () => {
  originText.innerHTML = promptText[0];
  console.log("working");
});

let originalText = promptText[0];

// creating the timer function
function timerLoop() {
  loop = setInterval(() => {
    hundredths++;
    if (hundredths == 100) {
      hundredths = 0;
      seconds++;
    }
    if (seconds == 60) {
      seconds = 0;
      minute++;
    }
    time = pad(minute) + ":" + pad(seconds) + ":" + pad(hundredths);
    theTimer.innerHTML = time;
  }, 10);
}

// Add leading zero to numbers 9 or below
function pad(val) {
  return val > 9 ? val : "0" + val;
}

// Match the text entered with the provided text on the page:
function matchKeys(keypress) {
  let lastRight = 0;
  // makes sure the start timer function can only run one time
  if (!running) startTimer();

  if (keypress.key.length <= 1) {
    userInput.push(keypress.key);
  } else if (keypress.key == "Backspace") {
    userInput.pop();
  }

  // turns original text to a char array then compares letter by letter and returns the first incorrect index or -1
  lastRight = [...originalText].findIndex((chr, i) => chr !== userInput[i]);
  // console.log(lastRight)
  if (!finished) {
    // correctText is how The red text is displayed.
    if (lastRight >= 0) {
      correctText.innerHTML = originalText.slice(0, lastRight);
      originText.innerHTML =
        correctText.outerHTML +
        originalText.slice(lastRight, originalText.length);
    } else {
      // case only happens if everything typed by the user is right
      correctText.innerHTML = originalText.slice(0, originalText.length);
      originText.innerHTML = correctText.outerHTML + "";
      finished = true;

      // stop timer and grab the current time.
      stopTimer();
    }
  }
}

function addTopTimes(newTime) {
  let currentBestTimes = [];
  let newRecord;
  currentBestTimes.push(leaderboard[0].innerHTML);
  currentBestTimes.push(leaderboard[1].innerHTML);
  currentBestTimes.push(leaderboard[2].innerHTML);

  // loops through the current best times
  for (let i = 0; i < currentBestTimes.length; i++) {
    let times = currentBestTimes[i].slice(
      currentBestTimes[i].length - 8,
      currentBestTimes[i].length
    );
    currentBestTimes[i] = times;

    // compares current time with leaderboard times then replaces it its higher
    if (currentBestTimes[i] > newTime) {
      let name = prompt("New high score! Please enter your name.");
      if (name != null) {
        newRecord = name + ": " + newTime;
        leaderboard[i].innerHTML = newRecord;
      }
      break;
    }
  }
}

// Start the timer:
function startTimer() {
  running = true;
  timerLoop();
}

function stopTimer() {
  clearInterval(loop);
  time = pad(minute) + ":" + pad(seconds) + ":" + pad(hundredths);
  addTopTimes(time);
}

// Reset everything:
function reset() {
  hundredths = 0;
  seconds = 0;
  minute = 0;
  inputBox.value = "";
  running = false;
  finished = false;
  clearInterval(loop);
  time = pad(minute) + ":" + pad(seconds) + ":" + pad(hundredths);
  theTimer.innerHTML = time;
  correctText.innerHTML = "";
  originText.textContent = originalText;
  userInput = [];
}

// Event listeners for keyboard input and the reset button:
inputBox.addEventListener("keydown", (event) => matchKeys(event));
resetButton.onclick = () => {
  reset();
};

function changeText() {
  reset();
  textIndex++;
  originText.innerHTML = promptText[textIndex % 3];
  originalText = promptText[textIndex % 3];
}

textButton.onclick = () => {
  changeText();
};
