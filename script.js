var arr = ["green", "red", "yellow", "blue"];
var choice = [];
var userClicked = [];
var level = 0;
var started = false;

// Game Start button functionality
$("#start-btn").click(function() {
  if (choice.length == 0) {
    level = 1; // Reset level when game restarts
    nextSequence();
    $("#start-btn").hide(); // Hide the start button after game starts
  }
});

function nextSequence() {
  userClicked = [];
  $("#level-title").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonChoose = randomNumber;
  choice.push(arr[buttonChoose]);
  $("#" + arr[buttonChoose]).fadeOut(200).fadeIn(200);
  playSound(arr[buttonChoose]);
}

// User Click
$(".btn").click(function(event) {
  var userChosenColour = $(this).attr("id");
  $("#" + userChosenColour).fadeOut(200).fadeIn(200);
  userClicked.push(userChosenColour);
  playSound(userChosenColour);
  animatePressed(userChosenColour);
  check(userClicked.length - 1);
});

// Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animation for button press
function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Check if the user's sequence matches the game's sequence
function check(index) {
  if (choice[index] === userClicked[index]) {
    console.log("correct");
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").html("Game Over, Press Start Button to Restart");
    $("#start-btn").show(); // Show start button again after game over
    choice = [];
    level = 0;
  }

  if (choice.length === userClicked.length && choice[index] === userClicked[index]) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
