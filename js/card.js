'use strict';

(function () {
  // Проверяем тип жилья
  function getTypeName(type) {
    switch (type) {
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      default:
        return 'Бунгало';
    }
  }

  // Удаляем карточку с объявлением
  function deleteCard() {
    var card = window.data.map.querySelector('.map__card');
    if (card) {
      card.parentNode.removeChild(card);
    }
  }

  function createModalFeatures(features) {
    var liElement = document.createElement('li');
    liElement.classList.add('popup__feature');

    var featuresElements = features.map(function (feature) {
      var liElementCopy = liElement.cloneNode(false);
      liElementCopy.classList.add('popup__feature' + '--' + feature);
      return liElementCopy;
    });

    return featuresElements;
  }

  function renderPlaceType(currentOffer, cardElement) {
    // Показываем тип квартиры
    // ... есди данных нет - удаляем элемент
    var popupTypeElement = cardElement.querySelector('.popup__type');
    try {
      var type = currentOffer.offer.type;
      var typeText = getTypeName(type);
      popupTypeElement.textContent = typeText;
    } catch (e) {
      popupTypeElement.parentNode.removeChild(popupTypeElement);
    }
  }

  function renderPlaceCapacity(currentOffer, cardElement) {
    // Показываем вместимость
    // ... есди данных нет - удаляем элемент
    var popupCapacityElement = cardElement.querySelector('.popup__text--capacity');
    try {
      var capacityText = currentOffer.offer.rooms + ' комнаты для ' + currentOffer.offer.guests + ' гостей';
      popupCapacityElement.textContent = capacityText;
    } catch (e) {
      popupCapacityElement.parentNode.removeChild(popupCapacityElement);
    }
  }

  // Создаем модальный элемент с описанием объявления
  function createModalElement(currentOffer) {
    // Создаем копию карточки
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    var timeText = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout;
    var imagesWrapperElement = cardElement.querySelector('.popup__photos');
    var imageElement = cardElement.querySelector('.popup__photo');
    var imageCopy = imageElement.cloneNode();
    var photosArray = currentOffer.offer.photos;
    var photosFragment = document.createDocumentFragment();
    imagesWrapperElement.innerHTML = '';

    var popupFeatures = cardElement.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    var featuresElements = createModalFeatures(currentOffer.offer.features);
    featuresElements.forEach(function (elem) {
      popupFeatures.appendChild(elem);
    });

    cardElement.querySelector('.popup__title').textContent = currentOffer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = currentOffer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = currentOffer.offer.price + '₽/ночь';

    renderPlaceType(currentOffer, cardElement);
    renderPlaceCapacity(currentOffer, cardElement);

    cardElement.querySelector('.popup__text--time').textContent = timeText;
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
      removeEventListeners();
    }

    function onPopupEscPress(evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        deleteCard();
        removeEventListeners();
      }
    }

    function removeEventListeners() {
      closeButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onPopupEscPress);
    }

    closeButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onPopupEscPress);
  }

  window.card = {
    delete: deleteCard,
    createModalElement: createModalElement,
  };
})();
