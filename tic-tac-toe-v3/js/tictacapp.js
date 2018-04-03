// Global Game Variables

const gameScreen = document.querySelector('#board');
const startScreen = document.querySelector('#start');
const startButton = document.querySelector('.button');
const playerOne = document.querySelector('#player1');
const playerTwo = document.querySelector('#player2');

// Hides the game board on start
gameScreen.style.display = "none";

// Hides the start screen and displays the game board
startButton.addEventListener('click', function() {
	startScreen.style.display = 'none';
	gameScreen.style.display = '';
});

function goesFirst () {
	let randInt = Math.floor(Math.random() * 2) + 1;
	if (randInt === 1) {
		playerOne.classList.add('active');
	} else {
		playerTwo.classList.add('active');
	}
}

goesFirst();