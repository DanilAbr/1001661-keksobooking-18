'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var ESC_KEYCODE = 27;

  // Проверяем тип жилья
  function checkType(currentOffer) {
    switch (currentOffer.offer.type) {
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
  }

  // Удаляем карточку с объявлением
  function deleteCards() {
    var map = document.querySelector('.map');
    var cards = map.querySelectorAll('.map__card');

    cards.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  }

  // Создаем модальный элемент с описанием объявления
  function createModalElement(currentOffer) {
    var map = document.querySelector('.map');
    var cardElement = cardTemplate.cloneNode(true);
    var typeText = checkType(currentOffer);
    var capacityText = currentOffer.offer.rooms + ' комнаты для ' + currentOffer.offer.guests + ' гостей';
    var timeText = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout;
    var imagesWrapperElement = cardElement.querySelector('.popup__photos');
    var imageElement = cardElement.querySelector('.popup__photo');
    var imageCopy = imageElement.cloneNode();
    imagesWrapperElement.innerHTML = '';
    var photosArray = currentOffer.offer.photos;
    var photosFragment = document.createDocumentFragment();

    cardElement.querySelector('.popup__title').textContent = currentOffer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = currentOffer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = currentOffer.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeText;
    cardElement.querySelector('.popup__text--capacity').textContent = capacityText;
    cardElement.querySelector('.popup__text--time').textContent = timeText;
    cardElement.querySelector('.popup__features').textContent = currentOffer.offer.features;
    cardElement.querySelector('.popup__description').textContent = currentOffer.offer.description;
    cardElement.querySelector('.popup__avatar').src = currentOffer.author.avatar;

    photosArray.forEach(function (imageSrc) {
      var secondImageCopy = imageCopy.cloneNode();
      secondImageCopy.src = imageSrc;
      photosFragment.appendChild(secondImageCopy);
    });

    imagesWrapperElement.appendChild(photosFragment);
    deleteCards();
    map.appendChild(cardElement);

    var closePopup = document.querySelector('.popup__close');

    closePopup.addEventListener('click', function () {
      deleteCards();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        deleteCards();
      }
    });
  }

  window.card = {
    deleteCards: deleteCards,
    createModalElement: createModalElement,
  };
})();
