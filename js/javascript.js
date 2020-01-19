
let memoryWrap = document.querySelector('.memory-wrap');

// object for data in the images array plus methods to change the array
let memoryGame = {
	images: ['img_01.svg', 'img_02.svg', 'img_03.svg', 'img_04.svg', 'img_05.svg', 'img_06.svg', 'img_07.svg', 'img_08.svg'],
	duplicateImages: function duplicateImages() {
		let duplicatedImages = [];
		for (let i = 0; i < this.images.length; i++) {
			duplicatedImages.push(this.images[i]);
			duplicatedImages.push(this.images[i]);
		};
		this.images = duplicatedImages;
	},
	shuffleImages: function shuffleImages(){
		for(let i = (this.images.length - 1); i > 0; i--){
			const random = Math.floor(Math.random() * i);
			const temporaryValue = this.images[i];
			this.images[i] = this.images[random];
			this.images[random] = temporaryValue;
		}
	},
	displayImages: function displayImages() {
		for(let i = 0; i < this.images.length; i++){
			let memoryCard = document.createElement('div');
			memoryCard.setAttribute('class', 'memory-card');
			memoryCard.classList.add('card-'+[i +1]);
			memoryWrap.appendChild(memoryCard);
			let memoryImage = document.createElement('div');
			memoryImage.setAttribute('style', 'background-image:url("images/' + this.images[i] + '")');
			memoryImage.setAttribute('class', 'memory-image');
			memoryCard.appendChild(memoryImage);
		}
	}
}

// object to handle events (user interactions)
let handlers = {
	showCard: function showCard() {
			console.log(event.target);
	},
	hideCard: function hideCard() {

	},
	matchingPair: function matchinPair() {

	}
}

memoryGame.duplicateImages();
memoryGame.shuffleImages();
memoryGame.displayImages();

// implement event delegation so that only one event listener is necessary
memoryWrap.addEventListener('click', function(event) {
	handlers.showCard(event);
});

	// store all pictures in one array, each of them exists twice (array in array?).
	// fill the 16 places in a random order with the existing pictures (places also array?)
	// create one array for not found pairs and one for found pairs
	// turn a card on click. When two cards are open, check if they are identical, if not, turn them around again and start over. If they are identical, leave them open and make them not clickable anymore. Take them out of the array?
	// how to duplicate images so that they still have a reference to each other?
