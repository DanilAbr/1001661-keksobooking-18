'use strict';

(function () {
  var ESC_KEYCODE = 27;

  // Проверяем тип жилья
  function checkType(currentOffer) {
    var typeElement;
    switch (currentOffer.offer.type) {
      case 'bungalo':
        typeElement = 'Бунгало';
        break;
      case 'house':
        typeElement = 'Дом';
        break;
      case 'palace':
        typeElement = 'Дворец';
        break;
      default:
        typeElement = 'Квартира';
        break;
    }
    return typeElement;
  }

  // Удаляем карточку с объявлением
  function deleteCard() {
    var map = document.querySelector('.map');
    var card = map.querySelectorAll('.map__card');

    if (card) {
      card.forEach(function (item) {
        item.parentNode.removeChild(item);
      });
    }
  }

  // Создаем модальный элемент с описанием объявления
  function createModalElement(currentOffer) {
    var map = document.querySelector('.map');
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var typeText = checkType(currentOffer);
    var capacityText = currentOffer.offer.rooms + ' комнаты для ' + currentOffer.offer.guests + ' гостей';
    var timeText = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout;
    var imagesWrapperElement = cardElement.querySelector('.popup__photos');
    var imageElement = cardElement.querySelector('.popup__photo');
    var imageCopy = imageElement.cloneNode();
    var photosArray = currentOffer.offer.photos;
    var photosFragment = document.createDocumentFragment();
    imagesWrapperElement.innerHTML = '';

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
    deleteCard();
    map.appendChild(cardElement);

    var closePopup = document.querySelector('.popup__close');

    closePopup.addEventListener('click', function () {
      deleteCard();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        deleteCard();
      }
    });
  }

  window.card = {
    deleteCard: deleteCard,
    createModalElement: createModalElement,
  };
})();
