var words = ["Spiders", "Josh Mohundro", "Fist of Five", "Yuri Tuppance", "Elijah Wilkes", "Javascript", "HTML", "CSS", "TrilogyEd", "Thomas Eaves", "Tasha Casagni", "JQuery", "Slack", "Bootcampspot", "Gitlab", "Github", "Fist of Five", "Lazy Programmers"];

var randomWord = "";
var lettersInTerm = [];
var lettersRemaining = 0;

var wins = 0;
var gamehud = [];
var guessesLeft = 0;
var lettersGuessed = [];

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//Functions
// =====================================================================================

function startGame() {

	var randomNumber = Math.floor(Math.random()* words.length);                  
	randomWord = words[randomNumber].toUpperCase();                              

	lettersInTerm = randomWord.split('');

	gamehud = [];
	lettersRemaining = 0;
	guessesLeft = 0;
	lettersGuessed = [];

	for (i in lettersInTerm) {
		if (lettersInTerm[i] !== " ") {
			gamehud.push("_");
			guessesLeft++;
			lettersRemaining++;		
		} else {
			gamehud.push("<br>");
		}
	}

	document.getElementById("wins").innerHTML = wins;
	document.getElementById("gamehud").innerHTML = gamehud.join(" ");
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

function check(letter) {
	document.getElementById("userPrompt").innerHTML = "";
	if (alphabet.includes(letter)) {
		if (lettersGuessed.indexOf(letter) === -1) {
				lettersGuessed.push(letter);
				document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(" ");
				guess(letter);
		} else {
			document.getElementById("userPrompt").innerHTML = "Letter already guessed. Please try a different letter."
		}
	} else {
		document.getElementById("userPrompt").innerHTML = "Please enter a letter.";
		letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();
	}
}

function guess(letter) {

	var letterInWord = null;

	for (var j = 0; j<lettersInTerm.length; j++) {
		if (lettersInTerm[j] === letter) {
			letterInWord = true;
		}
	}
	if (letterInWord) {
		for (var k = 0; k<lettersInTerm.length; k++) {
			if (lettersInTerm[k] === letter) {
				gamehud[k] = letter;
				document.getElementById("gamehud").innerHTML = gamehud.join(" ");
				lettersRemaining--;
			}
		}
	} else {
		if (guessesLeft > 0) {
			guessesLeft--;
		} else {
			guessesLeft = 0;
		}
		document.getElementById("guessesLeft").innerHTML = guessesLeft;
	}

	if (lettersRemaining === 0) {
		wins++;
		for (var i = 0; i<alphabet.length; i++) {
			if (!lettersGuessed.includes(alphabet[i])) {
				lettersGuessed.push(alphabet[i]);
			}
		}
	}
}

function checkWin() {
	if (lettersRemaining === 0) {
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("lettersGuessed").innerHTML = "";
		document.getElementById("userPrompt").innerHTML = "Victory!<br>Press ENTER to start next game";
		win = true;
		document.body.onkeyup = function(e){
			if (e.keyCode == 13) {
				startGame ();
			}
		}
	} else if (guessesLeft === 0) {
		var lose = "You lose!<br>The answer was: " + randomWord;
		document.getElementById("userPrompt").innerHTML = lose;
		document.getElementById("lettersGuessed").innerHTML = "";
		startGame();
	}
}

function play() {
	document.onkeyup = function(event) {
		var letterGuessed = String.fromCharCode(event.keyCode).toUpperCase();
		check(letterGuessed);
		checkWin();
	}
}

startGame()
play()