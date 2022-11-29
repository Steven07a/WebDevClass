$(function () {
  // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // alert to let user know buttons can be clicked or interacted with keyboard buttons 1-4
  alert("Press buttons or 1-4 on keyboard to interact with Kirby");

  // When each button is clicked, it will "call" function for that button (functions are below)
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".transform-button").click(clickedTransformationButton);
  
  // keydown function is called here
  $("body").keydown(function (e) {
    handleKeydown(e.key);
  });
});

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = {
  name: ["Kirby", "Link Kirby", "Sonic Kirby"],
  weight: 5,
  happiness: 0,
};

// variables to store refrences to different images 
var sadKirbysrc =
  "https://cdn.glitch.global/e9701dbf-0105-4d9a-8ea0-c202dae2694c/sad%20kibr.png?v=1668483283239";
var eatingKirby =
  "https://cdn.glitch.global/e9701dbf-0105-4d9a-8ea0-c202dae2694c/Untitled.png?v=1668484120505";
var playingKirby =
  "https://cdn.glitch.global/e9701dbf-0105-4d9a-8ea0-c202dae2694c/playing%20kirby.png?v=1668513608181";
var kirbyWorkoutimg = [
  "https://cdn.glitch.global/e9701dbf-0105-4d9a-8ea0-c202dae2694c/kirby-workout-1.png?v=1668507166202",
  "https://cdn.glitch.global/e9701dbf-0105-4d9a-8ea0-c202dae2694c/kirby-workout-2.png?v=1668507166853",
];
var kirbyimgArr = [
  "https://cdn.glitch.global/e9701dbf-0105-4d9a-8ea0-c202dae2694c/Kirby-Transparent-Images.png?v=1668478598721",
  "https://cdn.glitch.global/e9701dbf-0105-4d9a-8ea0-c202dae2694c/link%20kirby.png?v=1668493236873",
  "https://cdn.glitch.global/e9701dbf-0105-4d9a-8ea0-c202dae2694c/sonic%20kirby.png?v=1668493237522",
];
var index = 0,
  workoutIndex = 0;

// function to handle keypresses if the page is in focus 
function handleKeydown(keyPressed) {
  switch (keyPressed) {
    case "1":
      clickedTreatButton();
      break;
    case "2":
      clickedPlayButton();
      break;
    case "3":
      clickedExerciseButton();
      break;
    case "4":
      clickedTransformationButton();
      break;
  }
}

function clickedTreatButton() {
  // Increase pet happiness
  increaseHappiness();
  // Increase pet weight
  increaseWeight();
  changeKirbyPhoto("eatingKirby");

  // updates the rest of the info after a delay
  setTimeout(() => {
    checkAndUpdatePetInfoInHtml();
  }, 1250);
}

function clickedPlayButton() {
  // Increase pet happiness
  increaseHappiness();
  // Decrease pet weight
  decreaseWeight();
  changeKirbyPhoto("play");

  // updates the info after a delay
  setTimeout(() => {
    checkAndUpdatePetInfoInHtml();
  }, 1250);
}

function clickedExerciseButton() {
  // Decrease pet happiness
  decreaseHappiness();
  // Decrease pet weight
  decreaseWeight();

  //Change photo to workout photo
  changeKirbyPhoto("workoutKirby");

  // updates the rest of the info after some time this allows us to delay the photo changing
  setTimeout(() => {
    workoutIndex++;
    checkAndUpdatePetInfoInHtml();
  }, 1250);
}

function clickedTransformationButton() {
  index++;
  changeKirbyPhoto("happiness");
  fadePetnameIn();
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // if pet weight is below 0 set it back to 0
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
  changeKirbyPhoto("happiness");
}

// function to change photos based on kirbys happiness or action
function changeKirbyPhoto(action) {
  if (action == "eatingKirby") {
    document.getElementById("img").src = eatingKirby;
  }

  if (action == "happiness") {
    pet_info.happiness >= 0
      ? (document.getElementById("img").src =
          kirbyimgArr[index % kirbyimgArr.length])
      : (document.getElementById("img").src = sadKirbysrc);
  }

  if (action == "workoutKirby") {
    document.getElementById("img").src =
      kirbyWorkoutimg[workoutIndex % kirbyWorkoutimg.length];
  }

  if (action == "play") {
    document.getElementById("img").src = playingKirby;
  }
}

function increaseHappiness() {
  pet_info.happiness++;
}

function decreaseHappiness() {
  pet_info.happiness--;
}

function increaseWeight() {
  pet_info.weight++;
}

function decreaseWeight() {
  pet_info.weight--;
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $(".name").text(pet_info["name"][index % pet_info["name"].length]);
  $(".weight").text(pet_info["weight"]);
  $(".happiness").text(pet_info["happiness"]);
}

// function to fade the pet name in
function fadePetnameIn() {
  // delay function being used it slows down this animation
  $(".name").fadeOut().delay(300);
  
  setTimeout(() => {
    $(".name")
      .fadeIn()
      .text(pet_info["name"][index % pet_info["name"].length]);
  }, 500);
}