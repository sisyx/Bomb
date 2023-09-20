// first initialization
const container = document.querySelector('div.container');
const timeElement = document.querySelector('div.time');
const gameInfoDiv = document.querySelector('.game-info-div');
const hideBtn = document.querySelector('.hide-btn');
var spentTime = 0;
var activeBlocks = [];
var flagsCount = 0;


// start the game
startGame();

// count sppent time
let timeInterval = setInterval(() => {
	spentTime++
	timeElement.innerHTML = spentTime;
},1000);

// hide and show info btn
hideBtn.addEventListener('click', hide);



// functions

function blockClickHandler(event) {
	let chosenRow = getChosenRow(event.target);
	let chosenColumn = getChosenColumn(event.target); 
	// show number of active blocks arroun
	event.target.children[0].innerHTML = checkActiveBlocksNumbers(chosenRow, chosenColumn);

	if (event.target.classList.contains('flaged-block')) {
		console.log('hellllllllllo');
	} else {
		if (event.target.classList.contains('active')) {
			finishGame();
			// alert(';FINISH;');
			document.querySelector('.lose-popup').classList.remove('hidden');
			document.querySelector('.replay-btn').style.scale = 0;
			// restartGame();
			} else {
				event.target.classList.remove('un-opened-block');
				event.target.classList.add('opened-block');
			}
	}
	checkWining();
}

function blockRclickHandler(event) {
	let chosenRow = getChosenRow(event.target);
	let chosenColumn = getChosenColumn(event.target); 
	// show number of active blocks arroun
	event.target.children[0].innerHTML = checkActiveBlocksNumbers(chosenRow, chosenColumn);
	if (event.target.classList.contains('opened-block')) {
		console.log('hellllllllllo')
	} else {
		if (event.target.classList.contains('flaged-block')) {
			event.target.classList.remove('flaged-block');	
			flagsCount--;
		} else {
			event.target.classList.add('flaged-block');
			flagsCount++;
		}
	}
	document.querySelector('.flags-count').innerHTML = flagsCount;
	checkWining();
	event.preventDefault();
}


function createElements() {
	for (let i = 100; i > 0; i--) {
		const div = document.createElement('div');
		div.classList.add('block');
		div.classList.add('un-opened-block');
		div.classList.add(`c-${10-(i-1)%10}`);
		div.classList.add(`r-${parseInt((i+9)/10)}`);
		div.onclick = blockClickHandler;
		div.oncontextmenu = blockRclickHandler;

		const p = document.createElement('p');
		p.classList.add('text');

		div.append(p);
		container.append(div);
	}

	for (let i = 20; i > 0; i--) {
		let x = true;
		while (x) {
			const chosedBlock = Math.floor(Math.random() * 99);
			if (!(chosedBlock in activeBlocks)) {
				container.children[chosedBlock].classList.add('active');
				x = false;
			} 
		}
	}
}

function deleteElements() {
	document.querySelector('.win-popup').classList.add('hidden');
	document.querySelector('.lose-popup').classList.add('hidden');
	for (let i = 100 - 1; i >= 0; i--) {
		document.querySelectorAll('.block')[i].remove();
	}
}



function checkActiveBlocksNumbers(row,column) {
	let numberOfActivesArround = 0;
	if (chosenColumn != 1) {
		if (document.querySelector(`div.r-${chosenRow}.c-${chosenColumn-1}`).classList.contains('active')) { numberOfActivesArround++ }
	}
	if (chosenColumn != 10) {
		if (document.querySelector(`div.r-${chosenRow}.c-${chosenColumn+1}`).classList.contains('active')) { numberOfActivesArround++ }
	}
	if (chosenRow != 1) {
		if (document.querySelector(`div.r-${chosenRow-1}.c-${chosenColumn}`).classList.contains('active')) { numberOfActivesArround++ }
	}
	if (chosenRow != 10) {
		if (document.querySelector(`div.r-${chosenRow+1}.c-${chosenColumn}`).classList.contains('active')) { numberOfActivesArround++ }
	}
	if (chosenRow != 1 && chosenColumn != 1) {
		if (document.querySelector(`div.r-${chosenRow-1}.c-${chosenColumn-1}`).classList.contains('active')) { numberOfActivesArround++ }
	}
	if (chosenRow != 10 && chosenColumn != 1) {
		if (document.querySelector(`div.r-${chosenRow+1}.c-${chosenColumn-1}`).classList.contains('active')) { numberOfActivesArround++ }
	}
	if (chosenRow != 1 && chosenColumn != 10) {
		if (document.querySelector(`div.r-${chosenRow-1}.c-${chosenColumn+1}`).classList.contains('active')) { numberOfActivesArround++ }
	}
	if (chosenRow != 10 && chosenColumn != 10) {
		if (document.querySelector(`div.r-${chosenRow+1}.c-${chosenColumn+1}`).classList.contains('active')) { numberOfActivesArround++ }
	}

	return numberOfActivesArround;
}


function getChosenRow(element) {
	for (let j = 1; j <= 10; j++) {
		if (element.classList.contains(`r-${j}`)) {
			chosenRow = j;
		}
	}
	return chosenRow;
}


function getChosenColumn(element) {
	for (let j = 1; j <= 10; j++) {
		if (element.classList.contains(`c-${j}`)) {
			chosenColumn = j;
		}
	}
	return chosenColumn;
}


function finishGame() {
	spentTime = 0;
	flagsCount = 0;
	removeAllClasses('active');
	removeAllClasses('flaged-block');
	removeAllClasses('opened-block');
	addAllClasses('un-opened-block');
}


function startGame() {
	spentTime = 0;
	flagsCount = 0;
	createElements();
}


function restartGame(){
	spentTime = 0;
	flagsCount = 0;
	deleteElements();
	createElements();
	clearInterval(timeInterval)
	timeInterval = setInterval(() => {
		spentTime++
		timeElement.innerHTML = spentTime;
	},1000);
	document.querySelector('.replay-btn').style.scale = 1;
	
}

function removeAllClasses(nameClass) {
	for (let i = document.querySelectorAll(`.${nameClass}`).length-1; i >= 0; i--) {
		document.querySelectorAll(`.${nameClass}`)[i].classList.remove(nameClass);
	}
}

function addAllClasses(nameClass) {
	for (let i = document.querySelectorAll('.block').length - 1; i >= 0; i--) {
		document.querySelectorAll('.block')[i].classList.add(nameClass);
	}
}


function checkWining() {
	const flagsCountEnough = document.querySelectorAll('.active.flaged-block').length === document.querySelectorAll('.active').length;
	const opnedCountEnough = (document.querySelectorAll('.block').length - document.querySelectorAll('.opened-block').length) == document.querySelectorAll('.active');
	if (flagsCountEnough || opnedCountEnough) {
		document.querySelector('.win-popup').classList.remove('hidden')
		document.querySelector('.replay-btn').style.scale = 0;
		// alert('You Won!');
		for (let i = document.querySelectorAll('.un-opened-block').length - 1; i >= 0; i--) {
			if (document.querySelectorAll('.un-opened-block')[i].classList.contains('active') == false) {
				document.querySelectorAll('.un-opened-block')[i].classList.add('opened-block');
				document.querySelectorAll('.un-opened-block')[i].classList.remove('un-opened-block');
			} else {
				document.querySelectorAll('.un-opened-block')[i].classList.add('flaged-block');
				document.querySelectorAll('.un-opened-block')[i].classList.remove('un-flaged-block');
				document.querySelectorAll('.un-opened-block')[i].classList.remove('un-opened-block');
			}
		}
	}
}

function hide() {
	const infoStyle = window.getComputedStyle(gameInfoDiv);
	if (infoStyle['top'] == '5px') {
		gameInfoDiv.style.top = '-100%';
		hideBtn.style.rotate = '180deg';
	}
	else {
		gameInfoDiv.style.top = '5px';
		hideBtn.style.rotate = '0deg';
	}
}

function quirGame() {
	// stop timer
	clearInterval(timeInterval);
	
	// remove popupus
	document.querySelector('.win-popup').classList.add('hidden');
	document.querySelector('.lose-popup').classList.add('hidden');

	// clear events for blocks
	for (let i = 0; i < document.querySelectorAll('.block').length; i++ ) {
		document.querySelectorAll('.block')[i].onclick = event => {return};
		document.querySelectorAll('.block')[i].oncontextmenu = event => {return};
	}
}

function winCheat() {
	for (let i = document.querySelectorAll('.un-opened-block').length - 1; i >= 0; i--) {
		if (document.querySelectorAll('.un-opened-block')[i].classList.contains('active') == false) {
			document.querySelectorAll('.un-opened-block')[i].classList.add('opened-block');
			document.querySelectorAll('.un-opened-block')[i].classList.remove('un-opened-block');
		} else {
			document.querySelectorAll('.un-opened-block')[i].classList.add('flaged-block');
			document.querySelectorAll('.un-opened-block')[i].classList.remove('un-flaged-block');
		}
	}
	checkWining()
}