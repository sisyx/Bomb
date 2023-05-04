const container = document.querySelector('div.container')
const timeElement = document.querySelector('div.time');
var spentTime = 0;
var activeBlocks = [];
var flagsCount = 0;

setInterval(() => {
	spentTime++
	timeElement.innerHTML = spentTime;
},1000)


for (let i = 100; i > 0; i--) {
	const div = document.createElement('div');
	div.classList.add('block');
	div.classList.add('un-opened-block');
	div.classList.add(`c-${10-(i-1)%10}`);
	div.classList.add(`r-${parseInt((i+9)/10)}`);

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


const blockElementsList = document.querySelectorAll('div.block');
for (let i = 99; i >= 0; i--) {
		// get chosen row and column
		let chosenRow = getChosenRow(blockElementsList[i]);
		let chosenColumn = getChosenColumn(blockElementsList[i]); 
		// show number of active blocks arroun
		blockElementsList[i].children[0].innerHTML = checkActiveBlocksNumbers(chosenRow, chosenColumn);

		// click event
		blockElementsList[i].addEventListener('click', event => {
			if (event.target.classList.contains('flaged-block')) {
				console.log('hellllllllllo');
			} else {
				if (event.target.classList.contains('active')) {
					alert(';FINISH;');
				} else {
					blockElementsList[i].classList.remove('un-opened-block');
					blockElementsList[i].classList.add('opened-block');
				}
			}
		})


		// right click
		blockElementsList[i].addEventListener('contextmenu', event => {
			if (event.target.classList.contains('flaged-block')) {
				event.target.classList.add('un-flaged-block');
				event.target.classList.remove('flaged-block');	
				flagsCount--;
			} else {
				event.target.classList.remove('un-flaged-block');
				event.target.classList.add('flaged-block');
				flagsCount++;
			}
			document.querySelector('.flags-count').innerHTML = flagsCount;
			event.preventDefault();
		})
}








// functions

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