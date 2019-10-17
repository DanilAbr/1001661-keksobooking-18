'use strict';

var PHOTOS_ARR = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKOUT_ARR = ['12:00', '13:00', '14:00'];
var CHECKIN_ARR = ['12:00', '13:00', '14:00'];
var TYPE_ARR = ['palace', 'flat', 'house', 'bungalo'];
var title = 'заголовок предложения';
var address = '600, 350';
var description = 'Описание';
var SUM_PINS = 8;

// Создаем аватарку
var createAvatar = function () {
  for (var k = 1; k < SUM_PINS; k++) {
    var newAvatar = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return newAvatar;
};

// Создаем цену
var createPrice = function () {
  var price = Math.floor(Math.random() * 30000) + 700;
  return price;
};

// Создаем тип жилья
var createType = function () {
  var type = TYPE_ARR[Math.floor(Math.random() * TYPE_ARR.length)];
  return type;
};

// Создаем количество комнат
var createRooms = function () {
  var rooms = Math.ceil(Math.random() * 4);
  return rooms;
};

// Создаем количество гостей
var createGuests = function () {
  var guests = Math.floor(Math.random() * 7);
  return guests;
};

// Создаем время въезда
var createCheckin = function () {
  var checkin = CHECKIN_ARR[Math.floor(Math.random() * CHECKIN_ARR.length)];
  return checkin;
};

// Создаем время отъезда
var createCheckout = function () {
  var checkout = CHECKOUT_ARR[Math.floor(Math.random() * CHECKOUT_ARR.length)];
  return checkout;
};

// Создаем преимущества
var createFeatures = function () {
  var features = [];
  for (var i = 0; i < Math.floor(Math.random() * FEATURES_ARR.length); i++) {
    features.push(FEATURES_ARR[i]);
  }
  return features;
};

// Создаем фото
var createPhotos = function () {
  var photos = [];
  for (var i = 0; i < Math.ceil(Math.random() * PHOTOS_ARR.length); i++) {
    photos.push(PHOTOS_ARR[i]);
  }
  return photos;
};

// Создаем координату Х
var createX = function () {
  var x = Math.round(Math.random() * (document.querySelector('.map').offsetWidth));
  return x;
};

// Создаем координату Y
var createY = function () {
  var y = Math.round(Math.random() * (630 - 130) + 130);
  return y;
};

// Генерируем объект с данными для объявления
var offerDescription = function () {
  var createOfferDescription = {
    author: {
      avatar: createAvatar()
    },
    offer: {
      title: title,
      address: address,
      price: createPrice(),
      type: createType(),
      rooms: createRooms(),
      guests: createGuests(),
      checkin: createCheckin(),
      checkout: createCheckout(),
      features: createFeatures(),
      description: description,
      photos: createPhotos()
    },
    location: {
      x: createX(),
      y: createY()
    }
  };
  return createOfferDescription;
};

var pinDataArray = [];
for (var i = 0; i < SUM_PINS; i++) {
  pinDataArray.push(offerDescription());
}

document.querySelector('.map').classList.remove('map--faded');

var pinsContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Создаем пины и заполняем их данными из массива
var renderPin = function (pinData) {
  var pin = pinTemplate.cloneNode(true);

  pin.style = 'left: ' + (pinData.location.x - pin.offsetWidth / 2) + 'px; top: ' + (pinData.location.y - pin.offsetHeight) + 'px;';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;

  return pin;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < SUM_PINS; j++) {
  fragment.appendChild(renderPin(pinDataArray[j]));
}
pinsContainer.appendChild(fragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');

// Проверяем тип жилья
var checkType = function () {
  if (pinDataArray[0].offer.type === 'flat') {
    var typeElement = 'Квартира';
  }
  if (pinDataArray[0].offer.type === 'bungalo') {
    typeElement = 'Бунгало';
  }
  if (pinDataArray[0].offer.type === 'house') {
    typeElement = 'Дом';
  }
  if (pinDataArray[0].offer.type === 'palace') {
    typeElement = 'Дворец';
  }
  return typeElement;
};

// Создаем модальный элемент с описанием объявления
var createModalElement = function () {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = pinDataArray[0].offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pinDataArray[0].offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pinDataArray[0].offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = checkType();
  cardElement.querySelector('.popup__text--capacity').textContent = pinDataArray[0].offer.rooms + ' комнаты для ' + pinDataArray[0].offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinDataArray[0].offer.checkin + ', выезд до ' + pinDataArray[0].offer.checkout;
  cardElement.querySelector('.popup__features').textContent = pinDataArray[0].offer.features;
  cardElement.querySelector('.popup__description').textContent = pinDataArray[0].offer.description;
  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.   - тут нужна подсказка. Не понимаю, что делать.
  cardElement.querySelector('.popup__avatar').src = pinDataArray[0].author.avatar;

  return cardElement;
};
map.appendChild(createModalElement());
