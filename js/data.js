'use strict';

(function () {
  var CHECKOUT_ARR = ['12:00', '13:00', '14:00'];
  var CHECKIN_ARR = ['12:00', '13:00', '14:00'];
  var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_ARR = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var TYPE_ARR = ['palace', 'flat', 'house', 'bungalo'];
  var address = '600, 350';
  var description = 'Описание';
  var title = 'заголовок предложения';
  var sumPins = 8;

  // Создаем аватарку
  var createAvatar = function () {
    for (var i = 1; i < sumPins; i++) {
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

  window.data = {
    offerDescription: offerDescription,
    sumPins: sumPins,
  };
})();

