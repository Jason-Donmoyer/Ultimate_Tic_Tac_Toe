// Global Game Variables

const gameScreen = document.querySelector('#board');
const startScreen = document.querySelector('#start');
const startButton = document.querySelector('.button');
const newGameButton = document.querySelector('#newGameButton');
const boxes = document.querySelectorAll('.box');
let turns = 0;
const winScreen = document.querySelector('#finish');
let message = document.querySelector('.message');

// array of all possible winning combinations
const winningCombos = [
				["1", "2", "3"],
				["4", "5", "6"],
				["7", "8", "9"],
				["1", "4", "7"],
				["2", "5", "8"],
				["3", "6", "9"],
				["1", "5", "9"],
				["3", "5", "7"]
				];

// player objects

let PlayerOne = {
	name: String,
	isTurn: document.querySelector('#player1'),
	isActive: false,
	checkedBoxes: [],
	isWinner: false
};

let PlayerTwo = {
	name: String,
	isTurn: document.querySelector('#player2'),
	isActive: false,
	checkedBoxes: [],
	isWinner: false
};

// function to begin or refresh the game
function startGame () {
	// Hides the game board on start

	gameScreen.style.display = "none";
	winScreen.style.display = "none";


	// Hides the start screen and displays the game board
	startButton.addEventListener('click', function() {
		PlayerOne.name = prompt("Please enter your name:");
		startScreen.style.display = 'none';
		gameScreen.style.display = '';
	});
	goesFirst();
}

// Reloads the page
function restartGame() {
	location.reload();
}

// Displays winning screen
function displayWin () {
	gameScreen.style.display = "none";
	startScreen.style.display = "none";
	if (PlayerOne.isWinner) {
		winScreen.classList.add('screen-win-one');
		message.innerText = PlayerOne.name + " Wins!";
	} else if (PlayerTwo.isWinner) {
			winScreen.classList.add('screen-win-two');
			message.innerText = "Player Two Wins!";
	} else {
		winScreen.classList.add('screen-win-tie');
		message.innerText = "It's A Tie!";
	}
	
	winScreen.style.display = '';
	
	newGameButton.addEventListener('click', function() {
		restartGame();
	});

}

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
function switchTurn (x, y) {
		x.isTurn.classList.remove('active');
		y.isTurn.classList.add('active');
		x.isActive = false;
		y.isActive = true;
}

// Shows the game tied screen
function isTie () {
	if (turns === 9 && !PlayerOne.isWinner && !PlayerTwo.isWinner) {
		displayWin();
		}
}

// helper function for loop to check for winner
function checkBoxes (player, i) {
	if (player.checkedBoxes.includes(winningCombos[i][0]) &&
		 	player.checkedBoxes.includes(winningCombos[i][1]) && 
		 	player.checkedBoxes.includes(winningCombos[i][2])) {
			player.isWinner = true;
			displayWin();
			
		}
}

// loop through arrays to check for equality
function checkWinner (player) {
	// let n = player.checkedBoxes.sort();
	if (turns > 2) {
		for (let i = 0; i < winningCombos.length; i++) {
			
			for (let j = 0; j < winningCombos[i].length; j++) {
				if (player.checkedBoxes[j] === "1") {
					checkBoxes(player, i);
					break;
				} else if(player.checkedBoxes[j] === "2") {
					checkBoxes(player, i);
					break;
				} else if(player.checkedBoxes[j] === "3") {
					checkBoxes(player, i);
					break;
				} else if(player.checkedBoxes[j] === "4") {
					checkBoxes(player, i);
					break;
				} else if(player.checkedBoxes[j] === "7") {
					checkBoxes(player, i);
					break;
					
				} else if (turns === 9 && !PlayerOne.isWinner && !PlayerTwo.isWinner) {
					alert("It's a Tie");
					restartGame();
				}
			} 
		}
	} 
}
 

// creates the basic functionality of the game

for (let i = 0; i < boxes.length; i++) {

	// event listener for mouseenter and mouseleave
	boxes[i].addEventListener('mouseenter', function listen() {
		if (!boxes[i].classList.contains('box-filled-1') && !boxes[i].classList.contains('box-filled-2')) {	
		
		if (PlayerOne.isActive) {
			boxes[i].style.backgroundImage = "url('img/o.svg')";
		} else if (PlayerTwo.isActive) {
			boxes[i].style.backgroundImage = "url('img/x.svg')";
		}
	}
	});
	boxes[i].addEventListener('mouseleave', function() {
			boxes[i].style.backgroundImage = "";
			});

	
	// event listener for selecting boxes
	boxes[i].addEventListener('click', function click() {
		if (PlayerOne.isActive) {
			boxes[i].classList.add('box-filled-1');
			PlayerOne.checkedBoxes.push(boxes[i].id);
			PlayerOne.checkedBoxes.sort();
			turns++
			checkWinner(PlayerOne);
			isTie();
			switchTurn(PlayerOne, PlayerTwo);
			
		} else if (PlayerTwo.isActive) {
			boxes[i].classList.add('box-filled-2');
			PlayerTwo.checkedBoxes.push(boxes[i].id);
			PlayerTwo.checkedBoxes.sort();
			turns++
			checkWinner(PlayerTwo);
			isTie();
			switchTurn(PlayerTwo, PlayerOne);	
			
		}
			boxes[i].removeEventListener('click', click);
		});
			
	};
	

startGame();



















