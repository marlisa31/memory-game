const images = ['img_01.svg', 'img_02.svg', 'img_03.svg', 'img_04.svg', 'img_05.svg', 'img_06.svg', 'img_07.svg', 'img_08.svg'];

let memoryWrap = document.querySelector('.memory-wrap');

function displayImages() {
	for(let i=0; i < images.length; i++){
		let memoryCard = document.createElement('div');
		memoryCard.setAttribute('class', 'memory-card');
		memoryCard.classList.add('card-'+[i]);
		memoryWrap.appendChild(memoryCard);
		let memoryImage = document.createElement('div');
		memoryImage.setAttribute('style', 'background-image:url("images/' + images[i] + '")');
		memoryImage.setAttribute('class', 'memory-image');
		memoryCard.appendChild(memoryImage);
	}
}
displayImages();




	// store all pictures in one array, each of them exists twice (array in array?).
	// fill the 32 places in a random order with the existing pictures (places also array?)
	// create one array for not found pairs and one for found pairs
	// turn a card on click. When two cards are open, check if they are identical, if not, turn them around again and start over. If they are identical, leave them open and make them not clickable anymore. Take them out of the array?
	//
