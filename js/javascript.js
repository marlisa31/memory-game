
let memoryWrap = document.querySelector('.memory-wrap');

// object for data in the images array plus methods to change the array
let memoryGame = {
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
			this.images.slice(0);
	}
}

// object to handle events (user interactions)
let handlers = {
	showCard: function showCard(item) {
			item.classList.add('open');
	},
	hideCards: function hideCards() {
			memoryCards.forEach(function(item) {
					item.classList.remove('open');
			});
	},
	openCardsCount: 0,
	openCardsIncrease: function openCardsIncrease(){
		this.openCardsCount++;
	},
	openCardsCheck: function openCardsCheck(){
		if (this.openCardsCount == 2){
			// + block all cards from being clicked > remove event listener?
			this.openCardsCount = 0;
			setTimeout(this.hideCards, 1500);
		}
	},
	matchingPair: function matchingPair() {
		//if name is identical
	}
}

// duplicate, shuffle and display all cards
memoryGame.duplicateCards();
memoryGame.shuffleCards();
memoryGame.displayCards();

// convert NodeList of cards to array
const memoryCards = Array.prototype.slice.apply(document.querySelectorAll('.memory-card'));

// add EventListener to each of the cards
memoryCards.forEach(function(memoryCard){
	memoryCard.addEventListener('click', function(item) {
		handlers.showCard(memoryCard);
		handlers.openCardsIncrease();
		handlers.openCardsCheck();
		// + block event listener while one card is clicked and being opened

		// close cards if two are open
		// if cards don't match

	});
});

// console.log(memoryGame.unmatchedCards());
console.log(memoryGame.unmatchedCards);


/*
function cardCheck() {
	if (handlers.openCardsCount == 2){
		setTimeout(handlers.hideCards, 1500);
		handlers.openCardsCount = 0;
	}
}

cardCheck();
*/

	// PSEUDO CODE
	// store all pictures in one array, each of them exists twice (array in array?).
	// fill the 16 places in a random order with the existing pictures (places also array?)
	// create one array for not found pairs and one for found pairs
	// turn a card on click. When two cards are open, check if they are identical, if not, turn them around again and start over. If they are identical, leave them open and make them not clickable anymore. Take them out of the array?
	// how to duplicate images so that they still have a reference to each other?

	// if more than two cards are open, close them again before opening the next card
