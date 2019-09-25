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

var createAvatar = function () {
  for (var k = 1; k < SUM_PINS; k++) {
    var newAvatar = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return newAvatar;
};

var createPrice = function () {
  var price = Math.floor(Math.random() * 30000);
  return price;
};

var createType = function () {
  var type = TYPE_ARR[Math.floor(Math.random() * TYPE_ARR.length)];
  return type;
};

var createRooms = function () {
  var rooms = Math.floor(Math.random() * 5);
  return rooms;
};

var createGuests = function () {
  var guests = Math.floor(Math.random() * 7);
  return guests;
};

var createCheckin = function () {
  var checkin = CHECKIN_ARR[Math.floor(Math.random() * CHECKIN_ARR.length)];
  return checkin;
};

var createCheckout = function () {
  var checkout = CHECKOUT_ARR[Math.floor(Math.random() * CHECKOUT_ARR.length)];
  return checkout;
};

var createFeatures = function () {
  var features = [];
  for (var i = 0; i < Math.floor(Math.random() * FEATURES_ARR.length); i++) {
    features.push(FEATURES_ARR[i]);
  }
  return features;
};

var createPhotos = function () {
  var photos = [];
  for (var i = 0; i < Math.floor(Math.random() * PHOTOS_ARR.length); i++) {
    photos.push(PHOTOS_ARR[i]);
  }
  return photos;
};

var createX = function () {
  var x = Math.round(Math.random() * (document.querySelector('.map').offsetWidth));
  return x;
};

var createY = function () {
  var y = Math.round(Math.random() * (630 - 130) + 130);
  return y;
};

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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinsContainer = document.querySelector('.map__pins');

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
