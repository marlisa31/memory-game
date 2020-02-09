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
		for (let i = (this.images.length - 1); i > 0; i--){
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

			// create and append memory cover (child 1)
			let memoryCover = document.createElement('div');
			memoryCover.setAttribute('class', 'memory-cover');
			memoryCard.appendChild(memoryCover);

			// create and append memory image (child 2)
			let memoryImage = document.createElement('div');
			memoryImage.setAttribute('class', 'memory-image');
			memoryImage.setAttribute('style', 'background-image:url("images/' + this.images[i] + '")');
			memoryCard.appendChild(memoryImage);
		}
	},
	matchedPairs: 7,
	matchesCheck: function matchesCheck() {
		this.matchedPairs++;
		if ((this.matchedPairs * 2) == this.images.length) {
			//print out score
			setTimeout(this.endGame, 2050); // leave time for the second card to open properly
		}
	},
	startGame: function startGame() {
		this.duplicateCards();
		this.shuffleCards();
		this.displayCards();
	},
	endGame: function endGame() {
		modal.classList.add('open');
		extras.cloneStars();
	}
}

// object for all extras
let extras = {
	starAmount: 5,
	removeStar: function removeStar() {
		if(this.starAmount > 1){
			document.querySelector('.star-'+this.starAmount).classList.add('removed');
			this.starAmount--;
		}
	},
	cloneStars: function cloneStars() {
		const starsClone =	document.querySelector('.star-rating').cloneNode(true);
		document.querySelector('.star-rating-wrap').appendChild(starsClone);
	},
	timer: function timer() {
		let startingTime = new Date();

		// declare variables outside function so they can be accessed at the very beginning of the function already
		let formattedHours;
		let formattedMinutes;
		let formattedSeconds;

		let timeIteration = setInterval(function timeIteration() {

			// stop timer at end of game and print time of completion to modal
			if ((cards.matchedPairs * 2) == cards.images.length) {
				clearInterval(timeIteration);
				document.querySelector('.completion').innerHTML = formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
				return;
			}

			const currentTime = new Date();
			let counterTime = new Date(currentTime - startingTime);
			const hours = counterTime.getUTCHours();
			const minutes = counterTime.getMinutes();
			const seconds = counterTime.getSeconds();

			// format numbers to each have 2 digits
			function numberFormatting(number) {
				let prependingZero = ('0' + number).slice(-2);
				return prependingZero;
			}
			formattedHours = numberFormatting(hours);
			formattedMinutes = numberFormatting(minutes);
			formattedSeconds = numberFormatting(seconds);

			// print result to html
			document.querySelector('.timer').innerHTML = formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
		}, 999);
	},
	moveCount: 0,
	moveUpdate: function moveUpdate() {
		if (this.moveCount == 0){
			this.timer();
		}

		// remove star after every eight move
		if (this.moveCount % 8 == 0 && this.moveCount != 0) {
			this.removeStar();
		}

		// update moves and assign them to span element
		this.moveCount++;
		document.querySelector('.move-amount').innerHTML = this.moveCount;
	},
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
		function listening(){
			memoryWrap.addEventListener('click', handlers.generalHandling);
		}
		setTimeout(listening, 2500);
	},
	showCard: function showCard(item) {
			item.classList.add('open');
	},
	hideCards: function hideCards() {
			memoryCards.forEach(function(item) {
					item.classList.remove('open');
			});
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
			extras.moveUpdate();
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

// add EventListener to the wrap around memory card
memoryWrap.addEventListener('click', handlers.generalHandling);

// EventListener for closing modal
const modal = document.querySelector('#modal');
document.querySelector('#modal').addEventListener('click', handlers.closeModal);
