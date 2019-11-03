'use strict'
 
let urlStack = ['files/Xiaomi-Redmi-Note-8-Pro.jpg','files/Xiaomi-Redmi-Note-8-Pro-Pink.jpg','files/Xiaomi-Redmi-Note-8-Pro-Majenta.jpg','files/Xiaomi-Redmi-Note-8-Pro-Blue.jpg']
let proccesor = ['MTK','SNAPDRAGON'];
let nameOfParams = ['cores','proccessor','ram'];
let dataPhones = generateMassPhones();

// drag'n'drop variables 
let markerMin = document.querySelector('.marker-min');
let markerMax = document.querySelector('.marker-max');
let range = document.getElementsByClassName('range');


let isDrag = false;
let limits = {
	left: 0,
	right: range[0].offsetWidth +80
}
console.log (limits.right)
markerMin.onmousedown = function(e) {
  isDrag = true;
}
document.onmouseup = function() {
  isDrag = false;
}
document.onmousemove = function(e) {
  if (isDrag) {
    move(e);
  }
}
function move(e) {
	
  let newLocation = limits.left;
  if (e.pageX > limits.right){
  	newLocation = limits.right - markerMin.offsetWidth/2;
  } else if (e.pageX > limits.left) {
  	newLocation = e.pageX;
  }
  // if (e.pageX > limits.right) {
  //   newLocation.x = limits.right;
  // } else if (e.pageX > limits.left) {
  //   newLocation.x = e.pageX;
  // }
  relocate(newLocation);
}
function relocate(newLocation) {
  markerMin.style.left = newLocation + 'px';
}

    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
// Создание карты.
	var myMap = new ymaps.Map("map-block", {
	    // Координаты центра карты.
	    // Порядок по умолчанию: «широта, долгота».
	    // Чтобы не определять координаты центра карты вручную,
	    // воспользуйтесь инструментом Определение координат.
	    center: [60.002473, 30.296134],
	    // Уровень масштабирования. Допустимые значения:
	    // от 0 (весь мир) до 19.
	    zoom: 13
	});
	let myOffice = new ymaps.GeoObject({
		geometry: {
			type: 'Point',
			coordinates: [60.002970, 30.294911],
		},
		properties: {
			hintContent: 'My office',
			balloonContentBody: 'Actually my office',
			iconCaption: 'Our office'
		}
	})
	myMap.geoObjects.add(myOffice);
}
//generating phone's card
function generateMassPhones () {
	let massivePhones = [];
	let countOfObject = Math.floor(Math.random() * 12 + 6);
	for (let i = 0; i < countOfObject; i++){
		massivePhones.push({	
			imgUrl: urlStack[Math.floor(Math.random()*4)],
			name: 'XIAOMI',
			description: 'Смартфон Xiaomi Redmi',
			price: Math.floor(Math.random()*90000+10000),
			reaiting: (Math.random()*4 + 1).toFixed(1),
			reviews: Math.floor(Math.random()*7+10),
			param: {
				"cores": Math.floor(Math.random()*6+2) ,
				'proccessor': proccesor[Math.floor(Math.random()*2)] ,
				'ram': Math.floor(Math.random()*6+2) ,
				},
			})
	}
	return massivePhones;
}
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

function sortBy(massivePhones,paramForSort) {
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
let IsActiveFilter = false;

function renderFilter(dataAboutPhones,filterParam){
	if(IsActiveFilter === false){
		prepareForReload('.card-phone');
		proccessingCards(sortBy(dataAboutPhones,filterParam));
		IsActiveFilter = true;
	} 
	else {
		prepareForReload('.card-phone');
		proccessingCards(sortBy(dataAboutPhones,filterParam).reverse());
		IsActiveFilter = false;
	}
}
// function renderParamsList (paramsList,paramsName){
// 	let navBlock = document.querySelector('.params-list');
// 	for (let i = 0; i < paramsName.length; i++){
// 		let listItem = createElement('li','params-list-item');
// 		let inputParams = createElement('input','input-params');
// 		inputParams.type = 'checkbox';
// 		inputParams.id = 'params-'+i;
// 		let inputLabel = createElement('label','input-label',paramsName[i]+ ': ' + paramsList[0].param[paramsName[i]]);
// 		inputLabel.for = 'params-'+i;
// 		listItem.appendChild(inputParams);
// 		listItem.appendChild(inputLabel);
// 		navBlock.appendChild(listItem);
// 	}
// }
// function initMap () {
// 	// var letLong = new google.maps.LatLng(44.798609, -91.504912);

// 	var mapOptions = {
// 		zoom: 15,
// 		mapTypeId: google.maps.MapTypeId.ROADMAP,
// 		center: {lat: 44.79860, lng: 150.644}
// 	};

// 	var map = new google.maps.Map(document.getElementById('map-block'),mapOptions);
// }