var gamePattern =[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

var started=true;

var level=0;

$(document).keydown(function(){
    if(started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=false;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    $("#"+userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);



});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        document.querySelector("#level-title").textContent="Game Over, Press Any Key to Restart"
        
        startOver();
    }



}

function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}




function playSound(name){
    var audio = new Audio("sounds/" + name+".mp3");
audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}

function startOver(){
    level=0;
    gamePattern=[];
    started=true;

}
