'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Проверяем тип жилья
  var checkType = function () {
    switch (window.pin.pinDataArray[0].offer.type) {
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

    var currentOffer = window.pin.pinDataArray[0].offer;
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
    cardElement.querySelector('.popup__avatar').src = window.pin.pinDataArray[0].author.avatar;

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

  window.card = {
    createModalElement: createModalElement,
  };
})();
