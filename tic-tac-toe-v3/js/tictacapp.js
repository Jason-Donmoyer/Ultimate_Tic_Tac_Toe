// Global Game Variables

const gameScreen = document.querySelector('#board');
const startScreen = document.querySelector('#start');
const startButton = document.querySelector('.button');
//const playerOne = document.querySelector('#player1');
//const playerTwo = document.querySelector('#player2');

let PlayerOne = {
	isTurn: document.querySelector('#player1'),
	isActive: false
};

let PlayerTwo = {
	isTurn: document.querySelector('#player2'),
	isActive: false
};

// Hides the game board on start
gameScreen.style.display = "none";

// Hides the start screen and displays the game board
startButton.addEventListener('click', function() {
	startScreen.style.display = 'none';
	gameScreen.style.display = '';
});

// Function to pick who goes first
function goesFirst () {
	let randInt = Math.floor(Math.random() * 2) + 1;
	if (randInt === 1) {
		PlayerOne.isTurn.classList.add('active');
		PlayerOne.isActive = true;
	} else {
		PlayerTwo.isTurn.classList.add('active');
		PlayerTwo.isActive = true;
	}
}

// Function to change turns
function switchTurn () {
	if (PlayerTwo.isActive) {
		PlayerOne.isTurn.classList.remove('active');
		PlayerTwo.isTurn.classList.add('active');
	} else {
		PlayerTwo.isTurn.classList.remove('active');
		PlayerOne.isTurn.classList.add('active');
	}
}

let boxes = document.querySelectorAll('.box');

for (let i = 0; i < boxes.length; i ++) {
	boxes[i].addEventListener('mouseenter', function(e) {
		boxes[i].style.backgroundImage = "url('img/o.svg')";
	});
	boxes[i].addEventListener('mouseleave', function(e) {
		boxes[i].style.backgroundImage = "none";
	});
}

















goesFirst();