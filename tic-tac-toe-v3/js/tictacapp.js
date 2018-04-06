// Global Game Variables

const gameScreen = document.querySelector('#board');
const startScreen = document.querySelector('#start');
const startButton = document.querySelector('.button');
const boxes = document.querySelectorAll('.box');
let turns = 0;
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


//const playerOne = document.querySelector('#player1');
//const playerTwo = document.querySelector('#player2');

let PlayerOne = {
	isTurn: document.querySelector('#player1'),
	isActive: false,
	checkedBoxes: []
};

let PlayerTwo = {
	isTurn: document.querySelector('#player2'),
	isActive: false,
	checkedBoxes: []
};


function startGame () {
	// Hides the game board on start

	gameScreen.style.display = "none";

	// Hides the start screen and displays the game board
	startButton.addEventListener('click', function() {
		startScreen.style.display = 'none';
		gameScreen.style.display = '';
	});
	goesFirst();
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

function isTie () {
	if (turns === 9) {
		alert("It's a Tie");
		startScreen.style.display = '';
		// PlayerOne.isTurn.classList.remove('active');
		// PlayerTwo.isTurn.classList.remove('active');
		// for (let i = 0; i <= turns; i++ ) {
		// boxes[i].classList.remove('box-filled-1');
		// boxes[i].classList.remove('box-filled-2');
		// }
		startGame();
	}
}

// function isWinner (x) {
// 	for (let i = 0; i < x.checkedBoxes; i++) {
// 		if (x.checkedBoxes.sort()[0] === winningCombos[0][0] &&
// 			x.checkedBoxes.sort()[1] === winningCombos[0][1] &&
// 			x.checkedBoxes.sort()[2] === winningCombos[0][2]) {
// 			console.log("Win");
// 		} 
// 	}
// }
let isEqual = function (winVal, playerVal) {
	// get value of the type
	let type = Object.prototype.toString.call(winVal);

	// if the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(playerVal)) return false;

	// if items are not arrays or objects, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// compare length of items
	let winValLen = type === '[object Array]' ? winVal.length : Object.keys(winVal).length;
	let playerValLen = type === '[object Array]' ? playerVal.length : Object.keys(playerVal).length;
	if (winValLen !== playerValLen) return false;

	// comparing items
	let compare = function (foo, bar) {
		let itemType = Object.prototype.toString.call(foo);
		if (['[object Array]', '[object Array]'].indexOf(itemType) >= 0) {
			if (!isEqual(foo, bar)) return false;
		} else {
			if (itemType !== Object.prototype.toString.call(bar)) return false;
		}
	};

	// comparing properties
	let match;
	if (type === '[object Array]') {
		for (let i = 0; i < winValLen; i++) {
			if (compare(winVal[i], playerVal[i]) === false) return false;
		}
	} else {
		for (var key in winVal) {
			if (winVal.hasOwnProperty(key)) {
				if (compare(winVal[key], playerVal[key]) === false) return false;
			}
		}
	}

	// if nothing failed return true
	return true;
};

// loop through arrays to check for equality
function checkWinner (player) {
	if (turns >= 3) {
		for (let i = 0; i < winningCombos.length; i++) {
			if (isEqual(winningCombos[i], player.checkedBoxes)) {
				console.log("Winner");
				break;
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
			turns++
			//isWinner(PlayerOne);
			checkWinner(PlayerTwo);
			switchTurn(PlayerOne, PlayerTwo);
			
		} else if (PlayerTwo.isActive) {
			boxes[i].classList.add('box-filled-2');
			PlayerTwo.checkedBoxes.push(boxes[i].id);
			turns++
			//isWinner(PlayerTwo);
			checkWinner(PlayerTwo);
			switchTurn(PlayerTwo, PlayerOne);	
			
		}
			boxes[i].removeEventListener('click', click);
			isTie();
			});
		};
	

startGame();


















