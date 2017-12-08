var correctAnswers = 0;
var incorrectAnswers = 0;
var pokemon = [];
var answers = [];
var count = 10;
var question = 0;
var timeOut;
var missed = 0;
var questionStatus = ["Correct", "Incorrect", "Out of Time"];
var tmpStatus;

// Random number generator
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newGenerate(num, data) {
  for (var i = 0; i < num; i++) {
    var tmp = randomNumber(1, 151);
     if (data.includes(tmp)) {
       i--;
     }
     else {
       data.push(tmp);
     }
  }
}
function countDown() {
  var timeOut = setTimeout(countDown, 1000);
  if (count > 0) {
    $("#hide-element").text(count);
    count--;
    console.log(count);
  }
  else if (count == 0) {
    console.log("Times up");
    clearTimeout(timeOut);
    tmpStatus = 2;
    revealPokemon();
    missed++;
    }
  else {
    clearTimeout(timeOut);
  }
}

function startPage() {
  $(".box-game:eq(1)").append('<img src="" class="img"></div>');
  $(".img").attr("src", "assets/img/1.png");
  $(".img").attr("id", "slideshow");
  $(".grid-container").empty();
  $("#hide-element").hide();
  $(".box-game:eq(1)").append("<p class='status'>Can you name 'em all?</p>");
  $(".grid-container").append('<div class="grid-item" id="start">Start!</div>');
  $("#start").on("click", function() {
    startGame();
    gamePage();
  });
}

function gamePage() {
  $(".status").remove();
  $(".grid-container").empty();
  $(".box-game:eq(1)").empty();
  $(".img").attr("id", "img-hide");
  $(".box-game:eq(1)").append('<div class="box-game status" id="hide-element"></div>');
  $(".box-game:eq(1)").append('<img src="" class="img"></div>');
  for (i = 0; i < 6; i++) {
  $(".grid-container").append('<div class="grid-item"></div>');
  }
  nextPokemon();
}

function revealPokemon() {
  var tmpName = pokemon[question];
  console.log("Question Number: " + question);
  $(".img").attr("id", "");
  $(".grid-container").empty();
  if (question == 9) {
      console.log("Game Over");
      setTimeout(resultsPage, 3500);
      $(".box-game:eq(1)").append('<div class="box-game" id="reveal">' + pokemonName[tmpName] + '</div>');
      $(".status").html(questionStatus[tmpStatus]);
    }
  else {
    setTimeout(gamePage, 3500);
    $(".box-game:eq(1)").append('<div class="box-game" id="reveal">' + pokemonName[tmpName] + '</div>');
    $(".status").html(questionStatus[tmpStatus]);
    question++;
  }
}

function resultsPage() {
  $(".grid-container").empty();
  $("#reveal").empty();
  $(".img").attr("src", "assets/img/151.png");
  $(".img").attr("id", "");
  $("#hide-element").hide();
  $(".img").attr("id", "");
  $("<div class='box-game status'></div>").insertAfter(".box-game:eq(1)");
  $(".status").append("<p>Correct: " + correctAnswers + "</p>");
  $(".status").append("<p>Incorrect: " + incorrectAnswers + "</p>");
  if (missed != 0) {
    $(".status").append("<p>No Answer: " + missed + "</p>");
  }
  $(".grid-container").append('<div class="grid-item" id="new">New Game</div>');
  $("#new").on("click", function() {
    $(".box-game:eq(1)").empty();
    $(".status").empty();
    startGame();
    gamePage();
  });
}

function pickPokemon() {
  answers = [];
  count = -1;
  revealPokemon();
  clearTimeout(timeOut);
}
function nextPokemon() {
  count = 10;
  answers = [];
  newGenerate(5, answers);
  console.log("List Answers: " + answers);
  console.log("List Pokemon: " + pokemon);
  var tmpName = pokemon[question];
  console.log("Correct Pokemon: " + pokemonName[tmpName]);
  var randomAnswer = randomNumber(0, 5);
  console.log(randomAnswer + " Random Number");
  answers.splice(randomAnswer, 0, pokemon[question]);
  console.log("List Answers 2: " + answers);
  //answers.push(pokemon[question]);
  //answers.sort(function(a, b){return a - b;});
  $(".img").attr("id", "img-hide");
  $(".img").attr("src", "assets/img/" + pokemon[question] + ".png");
  for (i = 0; i < 6; i++) {
    $(".grid-item:eq(" + i + ")").attr("id", answers[i]);
    $(".grid-item:eq(" + i + ")").text(pokemonName[answers[i]]);
  }
  $(".grid-item").one("click", function () {
   if (this.id == pokemon[question]) {
      console.log("Correct Pokemon!");
      correctAnswers++;
      tmpStatus = 0;
      pickPokemon();
   }
   else {
      console.log("Incorrect Pokemon!");
      incorrectAnswers++;
      tmpStatus = 1;
      pickPokemon();
   }
  });
  countDown();
}

function startGame() {
  missed = 0;
  question = 0;
  pokemon = [];
  newGenerate(10, pokemon);
}
startPage();
