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
  return Math.random() * (max - min) + min;
}

// Generate data and check for dupes
function newGenerate(num, data) {
  for (var i = 0; i < num; i++) {
    var tmp = Math.trunc(randomNumber(1, 152));
     if (data.includes(tmp)) {
       i--;
     }
     else {
       data.push(tmp);
     }
  }
}

// Countdown Timer - Used to decrease 'count'
function countDown() {
  var timeOut = setTimeout(countDown, 1000);
  if (count > 0) {
    $("#hide-element").text(count);
    count--;
  }
  else if (count == 0) {
    clearTimeout(timeOut);
    tmpStatus = 2;
    revealPokemon();
    missed++;
    }
  else {
    clearTimeout(timeOut);
  }
}

// Generate and display a starting screen
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

// Generate and display pokemon to guess
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

// Reveal the pokemon
function revealPokemon() {
  var tmpName = pokemon[question];
  $(".img").attr("id", "");
  $(".grid-container").empty();
  if (question == 9) {
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

// Generate the display the results
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

// Catchall function for cleanup and run revealPokemon
function pickPokemon() {
  answers = [];
  count = -1;
  revealPokemon();
  clearTimeout(timeOut);
}

// Generate 5 answers and push the correct one randomly into the array
// Also used to display elements on the Game screen
function nextPokemon() {
  count = 10;
  answers = [];
  newGenerate(5, answers);
  var tmpName = pokemon[question];
  var randomAnswer = Math.trunc(randomNumber(0, 6));
  answers.splice(randomAnswer, 0, pokemon[question]);
  $(".img").attr("id", "img-hide");
  $(".img").attr("src", "assets/img/" + pokemon[question] + ".png");
  for (i = 0; i < 6; i++) {
    $(".grid-item:eq(" + i + ")").attr("id", answers[i]);
    $(".grid-item:eq(" + i + ")").text(pokemonName[answers[i]]);
  }
  $(".grid-item").one("click", function () {
   if (this.id == pokemon[question]) {
      correctAnswers++;
      tmpStatus = 0;
      pickPokemon();
   }
   else {
      incorrectAnswers++;
      tmpStatus = 1;
      pickPokemon();
   }
  });
  countDown();
}

// Set values to the default & generate 10 random pokemon
function startGame() {
  missed = 0;
  question = 0;
  pokemon = [];
  newGenerate(10, pokemon);
}

// Start the game :P
startPage();
