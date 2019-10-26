'use strict'

let dataPhones = [
{	
	imgUrl: 'files/Xiaomi-Redmi-Note-8-Pro.jpg',
	name: 'XIAOMI',
	description: 'Смартфон Xiaomi Redmi',
	price: Math.floor(Math.random()*90000+10000),
	reaiting: (Math.random()*4 + 1).toFixed(1),
	reviews: Math.floor(Math.random()*7+10),
},
{
	imgUrl: 'files/Xiaomi-Redmi-Note-8-Pro.jpg',
	name: 'XIAOMI',
	description: 'Смартфон Xiaomi Redmi',
	price: Math.floor(Math.random()*90000+10000),
	reaiting: (Math.random()*4 + 1).toFixed(1),
	reviews: Math.floor(Math.random()*7+10),
},
{	
	imgUrl: 'files/Xiaomi-Redmi-Note-8-Pro.jpg',
	name: 'XIAOMI',
	description: 'Смартфон Xiaomi Redmi',
	price: Math.floor(Math.random()*90000+10000),
	reaiting: (Math.random()*4 + 1).toFixed(1),
	reviews: Math.floor(Math.random()*7+10),
},
{	
	imgUrl: 'files/Xiaomi-Redmi-Note-8-Pro.jpg',
	name: 'XIAOMI',
	description: 'Смартфон Xiaomi Redmi',
	price: Math.floor(Math.random()*90000+10000),
	reaiting:(Math.random()*4 + 1).toFixed(1),
	reviews: Math.floor(Math.random()*7+10),
},
{	
	imgUrl: 'files/Xiaomi-Redmi-Note-8-Pro.jpg',
	name: 'XIAOMI',
	description: 'Смартфон Xiaomi Redmi',
	price: Math.floor(Math.random()*90000+10000),
	reaiting: (Math.random()*4 + 1).toFixed(1),
	reviews: Math.floor(Math.random()*7+10),
},
{	
	imgUrl: 'files/Xiaomi-Redmi-Note-8-Pro.jpg',
	name: 'XIAOMI',
	description: 'Смартфон Xiaomi Redmi',
	price: Math.floor(Math.random()*90000+10000),
	reaiting: (Math.random()*4 + 1).toFixed(1),
	reviews: Math.floor(Math.random()*7+10),
}
];

let createElement = function (nameTag, tagClass, tagTitle){
	let tag = document.createElement(nameTag);
	tag.classList.add(tagClass);
	if(tagTitle){
		tag.textContent = tagTitle;
	}
	return tag;
}

function createCard (aboutPhone){
	let section = createElement('section','card-phone');
	let img = createElement('img','card-img');
	img.src = aboutPhone.imgUrl;
	let h3 = createElement('h3','phone-brand-name',aboutPhone.name);
	let phoneName = createElement('p','phone-name',aboutPhone.description);
	let price = createElement('p','price',aboutPhone.price);
	
	let reviews = createElement('div','reviews');
	let spanRate = createElement('span','span-rate',aboutPhone.reaiting);
	let spanReviews = createElement('span','span-review',aboutPhone.reviews + ' отзывов');
	reviews.appendChild(spanRate);
	reviews.appendChild(spanReviews);
	section.appendChild(img);
	section.appendChild(h3);
	section.appendChild(phoneName);
	section.appendChild(price);
	section.appendChild(reviews);

	return section;
}
function proccessingCards (dataAboutPhones){
	let phoneBlocks = document.querySelector('.devisec-part');
	for (let i = 0; i < dataAboutPhones.length;i++){
		phoneBlocks.appendChild(createCard(dataAboutPhones[i]));
	}
}
function prepareForReload (classNameForReload){
	let tagsForReload = document.querySelectorAll(classNameForReload);
	for (let tag = 0 ; tag < tagsForReload.length; tag++){
		tagsForReload[tag].remove();
	}
}

function sortByPrice(massivePhones,paramForSort) {
	for (let i = 0; i < massivePhones.length; i++){
		for (let j = 1; j < massivePhones.length; j++){
			if (massivePhones[j-1][paramForSort] > massivePhones[j][paramForSort]){
				let pass = massivePhones[j];
				massivePhones[j] = massivePhones[j-1];
				massivePhones[j-1] = pass; 
			}
		}
	}
	return massivePhones;
}
let IsActiveFilterByPrice = false;
function renderFilter(dataAboutPhones,filterParam){
	if(IsActiveFilterByPrice === false){
		prepareForReload('.card-phone');
		proccessingCards(sortByPrice(dataAboutPhones,filterParam));
		IsActiveFilterByPrice = true;
	} 
	else {
		prepareForReload('.card-phone');
		proccessingCards(sortByPrice(dataAboutPhones,filterParam).reverse());
		IsActiveFilterByPrice = false;
	}
}