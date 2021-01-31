var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 1;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).fadeOut(300).fadeIn(300);
}

function changeHeader(text) {
  $("#level-title").text(text);
}


$(document).keydown(function () {
  if (started === false) {
    setTimeout(nextSequence, 200);
    // $("#level-title").text("Level 0");
    started = true;
    console.log(started);
    gamePattern = [];
  }
});

function nextSequence() {

    var randomNumber = (Math.floor((Math.random() * 4)));
    var randomChosenColor = buttonColors[randomNumber];

    animatePress(randomChosenColor);

    playSound(randomChosenColor);

    gamePattern.push(randomChosenColor);

    console.log(gamePattern);
    console.log(gamePattern.length);

    $("#level-title").text("Level " + level);

    level++;

    userClickedPattern = [];
}


$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);

  console.log(userClickedPattern);
  console.log(userClickedPattern.length);

  checkAnswer();
});

function checkAnswer() {
  if (userClickedPattern.length === gamePattern.length) {

    if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
      setTimeout(nextSequence, 500);
    } else {
      changeHeader("GAME OVER");
      $("body").addClass("game-over");
      setTimeout( function () {
          $("body").removeClass("game-over"); }, 300);
      playSound("wrong");
      setTimeout(function ()
        { changeHeader("Press Any Key To Try Again");}, 1500);
      started = false;
      level = 1;
  }
    }
}
