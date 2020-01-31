const memoryWrap = document.querySelector('.memory-wrap');

// object for data in the images array plus methods to change the array
let cards = {
	images: ['img_01.svg', 'img_02.svg', 'img_03.svg', 'img_04.svg', 'img_05.svg', 'img_06.svg', 'img_07.svg', 'img_08.svg'],
	duplicateCards: function duplicateCards() {
		let duplicatedCards = [];
		for (let i = 0; i < this.images.length; i++) {
			duplicatedCards.push(this.images[i]);
			duplicatedCards.push(this.images[i]);
		};
		this.images = duplicatedCards;
	},
	shuffleCards: function shuffleCards(){
		for(let i = (this.images.length - 1); i > 0; i--){
			const random = Math.floor(Math.random() * i);
			const temporaryValue = this.images[i];
			this.images[i] = this.images[random];
			this.images[random] = temporaryValue;
		}
	},
	displayCards: function displayCards() {
		for(let i = 0; i < this.images.length; i++){

			// create and append memory card (parent)
			let memoryCard = document.createElement('div');
			memoryCard.setAttribute('class', 'memory-card');
			memoryCard.classList.add('card-'+[i +1]);
			memoryWrap.appendChild(memoryCard);

			// create and append memory cover (child)
			let memoryCover = document.createElement('div');
			memoryCover.setAttribute('class', 'memory-cover');
			memoryCard.appendChild(memoryCover);

			// create and append memory image (child)
			let memoryImage = document.createElement('div');
			memoryImage.setAttribute('class', 'memory-image');
			memoryImage.setAttribute('style', 'background-image:url("images/' + this.images[i] + '")');
			memoryCard.appendChild(memoryImage);
		}
	},
	timer: function timer() {
		// get initial time
		let startingTime = new Date().getTime();

		// interval function to subtract initial time from current time
		let timeIteration = setInterval(function timeIteration() {
			// get current time
			const currentTime = new Date().getTime();

			// get counter time
			let counterTime = parseInt((currentTime - startingTime) / 1000); // get counter time and convert milliseconds to seconds
			const counterHours = parseInt(counterTime / 3600); // hours: 3600 seconds in an hour
			counterTime = parseInt(counterTime % 3600); // substract all full hours
			const counterMinutes = parseInt(counterTime / 60) // minutes: 60 seconds in a minute
			counterTime = parseInt(counterTime % 60); // substract all full minutes
			const counterSeconds = parseInt(counterTime); // seconds

			// format numbers to each have 2 digits
			function numberFormatting(number) {
				let prependingZero = ('0' + number).slice(-2);
				return prependingZero;
			}
			const formattedHours = numberFormatting(counterHours);
			const formattedMinutes = numberFormatting(counterMinutes);
			const formattedSeconds = numberFormatting(counterSeconds);

			// print result to html
			document.querySelector('.timer').innerHTML = formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
		}, 1000);
	},
	matchedPairs: 0,
	matchesCheck: function matchesCheck() {
		this.matchedPairs++;
		if ((this.matchedPairs * 2) == this.images.length) {
			setTimeout(this.gameEnd, 2050);
		}
	},
	startGame: function startGame() {
		this.duplicateCards();
		this.shuffleCards();
		this.displayCards();
	},
	gameEnd: function gameEnd() {
		modal.classList.add('open');
	}
}

// duplicate, shuffle and display all cards
cards.startGame();

// object to handle events (user interactions)
let handlers = {
	generalHandling: function generalHandling(event) {

		// exit function if selected target is not correct
	  if (!event.target.matches('.memory-cover')) return;

		// select parent element of .memory-cover which is .memory-card
		const memoryCard = event.target.parentNode;
		handlers.showCard(memoryCard);
		handlers.openCardsIncrease(memoryCard);
		handlers.openCardsCheck(memoryCard);
	},
	delayHandling: function delayHandling() {
		memoryWrap.removeEventListener('click', handlers.generalHandling);
		function Listening(){
			memoryWrap.addEventListener('click', handlers.generalHandling);
		}
		setTimeout(Listening, 2500);
	},
	showCard: function showCard(item) {
			item.classList.add('open');
	},
	hideCards: function hideCards() {
			memoryCards.forEach(function(item) {
					item.classList.remove('open');
			});
	},
	moveCount: 0,
	moveUpdate: function moveUpdate() {
		// start timer once game is started
		if (this.moveCount == 0){
			cards.timer();
		}
		// update moves and assign them to span element
		this.moveCount++;
		document.querySelector('.move-amount').innerHTML = this.moveCount;
	},
	firstCard: '',
	secondCard: '',
	openCardsCount: 0,
	openCardsIncrease: function openCardsIncrease() {
		this.openCardsCount++;
	},
	openCardsCheck: function openCardsCheck(item) {

		// if first card during one move is turned over
		if (this.openCardsCount == 1) {
			this.firstCard = item.firstChild.nextSibling;
			this.moveUpdate();
		}
		// if second card during one move is turned over
		else if (this.openCardsCount == 2) {
			this.secondCard = item.firstChild.nextSibling;
			handlers.compareCards();

			// if cards are not identical hide cards again
			handlers.delayHandling();
			setTimeout(handlers.hideCards, 2000);
			this.openCardsCount = 0;
		}
	},
	compareCards: function compareCards() {

		// compare if first and second card are identical
		if (this.firstCard.style.backgroundImage == this.secondCard.style.backgroundImage) {
			this.firstCard.parentNode.classList.add('permanently-open');
			this.secondCard.parentNode.classList.add('permanently-open');
			cards.matchesCheck();
		}
	},
	closeModal: function closeModal() {
		modal.classList.remove('open');
	}
}

// convert NodeList of cards to array
const memoryCards = Array.prototype.slice.apply(document.querySelectorAll('.memory-card'));

// add EventListener to each of the cards
memoryWrap.addEventListener('click', handlers.generalHandling);

// EventListener for closing modal
const modal = document.querySelector('#modal');
document.querySelector('.close').addEventListener('click', handlers.closeModal);
