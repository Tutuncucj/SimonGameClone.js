let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
});

$("#started").click(function () {
    if (!started) {

        $("#started").css("display","none")

        nextSequence();
        started = true;

    }
});

$(".btn").click(function () {

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function () {
                nextSequence();
            }, 1000);

        } else if (level === 13) {

            $("body").addClass("win");
            setTimeout(function () {
                $("body").removeClass("win");
            }, 100);

            $("#level-title").text("YOU WİN!, Press Any Key to Restart");

            $("#started").css("display","inline-block")
            $("#started").text("Press Any Key or Button to Restart");

            startOver();
        }

        } else {

            console.log("wrong");

            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart");

            $("#started").css("display","inline-block")
            $("#started").text("Press Any Key or Button to Restart");

            startOver();

        }

}

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    $("#started").css("display","none")

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}