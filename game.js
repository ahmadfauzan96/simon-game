//The arrays
var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
//Check if the game has been started.
var started = false;
//Starting level
var level = 0;
//Press any key to start the game.
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//Click any button
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //User Interface
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //Check the answer.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 200);
    }
  } else { //Game Over
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //Restart the game.
    startOver();
  }
}

function nextSequence() {
  //Reset the userClickedPattern array.
  userClickedPattern.length = 0;
  //Level Up
  level++;
  $("#level-title").text("Level " + level);
  //Generate a random color for the next sequence and add it to the gamePattern array.
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  //User Interface
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//Restart the game.
function startOver() {
  level = 0;
  gamePattern.length = 0;
  // userClickedPattern.length = 0;
  started = false;
}

//User Interface functions
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
