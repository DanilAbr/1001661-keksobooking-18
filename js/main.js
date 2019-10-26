'use strict';

var CHECKOUT_ARR = ['12:00', '13:00', '14:00'];
var CHECKIN_ARR = ['12:00', '13:00', '14:00'];
var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARR = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var SUM_PINS = 8;
var TYPE_ARR = ['palace', 'flat', 'house', 'bungalo'];
var ENTER_KEYCODE = 13;
var address = '600, 350';
var description = 'Описание';
var title = 'заголовок предложения';

var adForm = document.querySelector('.ad-form');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fieldset = document.querySelectorAll('.ad-form__element');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var mainAddress = document.querySelector('#address');
var mapPinMainTop = parseInt(mapPinMain.style.top, 10);
var mapPinMainLeft = parseInt(mapPinMain.style.left, 10);
var mapPinMainCenter = Math.round(mapPinMain.offsetWidth / 2);
var mainPinAddress = (mapPinMainLeft + mapPinMainCenter) + ', ' + (mapPinMainTop + mapPinMainCenter * 2);

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

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');

  // Создаем пины и заполняем их данными из массива
  var getPin = function (pinData) {
    var pin = pinTemplate.cloneNode(true);
    var pinStyleLeft = pinData.location.x - pin.offsetWidth / 2;
    var pinStyleRight = pinData.location.y - pin.offsetHeight;

    pin.style = 'left: ' + pinStyleLeft + 'px; top: ' + pinStyleRight + 'px;';
    pin.querySelector('img').src = pinData.author.avatar;
    pin.querySelector('img').alt = pinData.offer.title;

    return pin;
  };
}

var fragmentPins = document.createDocumentFragment();
for (var j = 0; j < SUM_PINS; j++) {
  fragmentPins.appendChild(getPin(pinDataArray[j]));
}

// Проверяем тип жилья
var checkType = function () {
  switch (pinDataArray[0].offer.type) {
    case 'flat':
      var typeElement = 'Квартира';
      break;
    case 'bungalo':
      typeElement = 'Бунгало';
      break;
    case 'house':
      typeElement = 'Дом';
      break;
    case 'palace':
      typeElement = 'Дворец';
  }
  return typeElement;
};

// Создаем модальный элемент с описанием объявления
var createModalElement = function () {
  var cardElement = cardTemplate.cloneNode(true);

  var currentOffer = pinDataArray[0].offer;
  var typeText = checkType();
  var capacityText = currentOffer.rooms + ' комнаты для ' + currentOffer.guests + ' гостей';
  var timeText = 'Заезд после ' + currentOffer.checkin + ', выезд до ' + currentOffer.checkout;

  cardElement.querySelector('.popup__title').textContent = currentOffer.title;
  cardElement.querySelector('.popup__text--address').textContent = currentOffer.address;
  cardElement.querySelector('.popup__text--price').textContent = currentOffer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typeText;
  cardElement.querySelector('.popup__text--capacity').textContent = capacityText;
  cardElement.querySelector('.popup__text--time').textContent = timeText;
  cardElement.querySelector('.popup__features').textContent = currentOffer.features;
  cardElement.querySelector('.popup__description').textContent = currentOffer.description;
  cardElement.querySelector('.popup__avatar').src = pinDataArray[0].author.avatar;

  var imagesWrapperElement = cardElement.querySelector('.popup__photos');
  var imageElement = cardElement.querySelector('.popup__photo');
  var imageCopy = imageElement.cloneNode();
  imagesWrapperElement.innerHTML = '';
  var photosArray = currentOffer.photos;
  var photosFragment = document.createDocumentFragment();

  photosArray.forEach(function (imageSrc) {
    var secondImageCopy = imageCopy.cloneNode();
    secondImageCopy.src = imageSrc;
    photosFragment.appendChild(secondImageCopy);
  });

  imagesWrapperElement.appendChild(photosFragment);

  return cardElement;
};

// Добавляем аттрибут disabled всем <input> и <select> формы .ad-form
var fieldsetDisabled = function () {
  for (var k = 0; k < fieldset.length; k++) {
    fieldset[k].setAttribute('disabled', true);
  }
};

// Удаляем аттрибут disabled всем <input> и <select> формы .ad-form
var fieldsetActive = function () {
  for (var k = 0; k < fieldset.length; k++) {
    fieldset[k].removeAttribute('disabled', true);
  }
};

fieldsetDisabled();
mapFilters.classList.add('ad-form--disabled');
mainAddress.value = mainPinAddress;

// Переводим в активный режим
var toActiveMode = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  fieldsetActive();
  mapFilters.classList.remove('ad-form--disabled');
  mainAddress.value = mainPinAddress;
  pinsContainer.appendChild(fragmentPins);
  map.appendChild(createModalElement());
};

mapPinMain.addEventListener('mousedown', function () {
  toActiveMode();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    toActiveMode();
  }
});

var selectRooms = document.querySelector('#room_number');
var selectGuests = document.querySelector('#capacity');

selectGuests.options[2].setAttribute('selected', true);

// Убираем варианты выбора количества гостей в зависимости от выбранного количества комнат
selectRooms.onchange = function () {
  selectGuests.options[0].removeAttribute('selected', true);
  selectGuests.options[1].removeAttribute('selected', true);
  selectGuests.options[2].removeAttribute('selected', true);
  selectGuests.options[3].removeAttribute('selected', true);
  switch (this.value) {
    case '1':
      selectGuests.options[0].setAttribute('disabled', true);
      selectGuests.options[1].setAttribute('disabled', true);
      selectGuests.options[2].removeAttribute('disabled', true);
      selectGuests.options[3].setAttribute('disabled', true);
      selectGuests.options[2].setAttribute('selected', true);
      break;
    case '2':
      selectGuests.options[0].setAttribute('disabled', true);
      selectGuests.options[1].removeAttribute('disabled', true);
      selectGuests.options[2].removeAttribute('disabled', true);
      selectGuests.options[3].setAttribute('disabled', true);
      selectGuests.options[2].setAttribute('selected', true);
      break;
    case '3':
      selectGuests.options[0].removeAttribute('disabled', true);
      selectGuests.options[1].removeAttribute('disabled', true);
      selectGuests.options[2].removeAttribute('disabled', true);
      selectGuests.options[3].setAttribute('disabled', true);
      selectGuests.options[2].setAttribute('selected', true);
      break;
    case '100':
      selectGuests.options[0].setAttribute('disabled', true);
      selectGuests.options[1].setAttribute('disabled', true);
      selectGuests.options[2].setAttribute('disabled', true);
      selectGuests.options[3].removeAttribute('disabled', true);
      selectGuests.options[3].setAttribute('selected', true);
      break;
  }
};
