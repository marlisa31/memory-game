
let memoryWrap = document.querySelector('.memory-wrap');

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

			// Create and append memory image (child)
			let memoryImage = document.createElement('div');
			memoryImage.setAttribute('class', 'memory-image');
			memoryImage.setAttribute('style', 'background-image:url("images/' + this.images[i] + '")');
			memoryCard.appendChild(memoryImage);
		}
	},
	matchedCards: [],
	unmatchedCards: function createUnmatchedCards() {
			var unmatchedCards = this.images.slice(0);
			this.images.slice(0);
			console.log(this.images.slice(0));
	}
}

// object to handle events (user interactions)
let handlers = {
	generalHandling: function generalHandling(event) {
		// exit function if selected target is not correct
	  if (!event.target.matches('.memory-cover')) return

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
	openCardsCount: 0,
	openCardsIncrease: function openCardsIncrease() {
		this.openCardsCount++;
		console.log(this.openCardsCount);
	},
	openCardsCheck: function openCardsCheck(item) {
		if (handlers.openCardsCount == 2) {
			handlers.delayHandling();
			setTimeout(handlers.hideCards, 2000);
			this.openCardsCount = 0;
		}
		else {
			return;
		}
	},
	matchingPair: function matchingPair() {
		if (handlers.openCardsCount == 2 && item.) {
			// the current card gets permanently open class
			item.classList.add('permanently-open');
			// the other matching card gets permanently open class
		}
		//if name is identical
	}
}

// duplicate, shuffle and display all cards
cards.duplicateCards();
cards.shuffleCards();
cards.displayCards();

// convert NodeList of cards to array
const memoryCards = Array.prototype.slice.apply(document.querySelectorAll('.memory-card'));

// add EventListener to each of the cards
memoryWrap.addEventListener('click', handlers.generalHandling);


console.log(cards.unmatchedCards());
//console.log(cards.unmatchedCards);

console.log(cards.images);

	// PSEUDO CODE
	// store all pictures in one array, each of them exists twice (array in array?).
	// fill the 16 places in a random order with the existing pictures (places also array?)
	// create one array for not found pairs and one for found pairs
	// turn a card on click. When two cards are open, check if they are identical, if not, turn them around again and start over. If they are identical, leave them open and make them not clickable anymore. Take them out of the array?
	// how to duplicate images so that they still have a reference to each other?

	// if more than two cards are open, close them again before opening the next card



// store number 1 in variable and
