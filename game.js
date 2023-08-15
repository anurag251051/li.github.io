var gamePattern=[]
var buttonColours = ["red","blue","green","yellow"]
var userClickedPattern = [];

var started=false;
var level=0

$(document).keydown(function(){
  if (!started) {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
})

$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  // $(this): This refers to the element that triggered the click event.
  // In this case, it's the button that was clicked.

// .attr("id"): This jQuery method retrieves the value of the "id" attribute of the element.
// It fetches the ID of the button that was clicked.
  console.log(userChosenColour)
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success")
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function (){
        nextSequence()
      },1000)
    }
  } else {
    console.log("wrong")
    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

//2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

//3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}

function nextSequence(){
  userClickedPattern=[]
  level++
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4)
  var randomChosenColour=buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  console.log(randomChosenColour)
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColour)
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3")
  audio.play()
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed")
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed")
  },100)
}

function startOver(){
  level=0
  gamePattern=[]
  started=false
}
