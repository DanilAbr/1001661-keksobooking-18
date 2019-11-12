'use strict';

(function () {
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
    var cards = window.data.map.querySelectorAll('.map__card');

    if (cards) {
      cards.forEach(function (item) {
        item.parentNode.removeChild(item);
      });
    }
  }

  // Создаем модальный элемент с описанием объявления
  function createModalElement(currentOffer) {
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

    var featureIcons = document.querySelectorAll('.map__checkbox');
    // featureIcons.forEach(function () {

    // });

    var elem = featureIcons[0].cloneNode(true);
    cardElement.querySelector('.popup__features').appendChild(elem);

    cardElement.querySelector('.popup__description').textContent = currentOffer.offer.description;
    cardElement.querySelector('.popup__avatar').src = currentOffer.author.avatar;

    photosArray.forEach(function (imageSrc) {
      var secondImageCopy = imageCopy.cloneNode();
      secondImageCopy.src = imageSrc;
      photosFragment.appendChild(secondImageCopy);
    });

    imagesWrapperElement.appendChild(photosFragment);
    deleteCard();
    window.data.map.appendChild(cardElement);

    var closeButton = document.querySelector('.popup__close');

    function onCloseButtonClick() {
      deleteCard();
    }

    function onPopupEscPress(evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        deleteCard();
        document.removeEventListener('keydown', onPopupEscPress);
      }
    }

    closeButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onPopupEscPress);
  }

  window.card = {
    deleteCard: deleteCard,
    createModalElement: createModalElement,
  };
})();
