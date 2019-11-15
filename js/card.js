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
    // Показываем тип жилья
    // ... если данных нет - удаляем элемент
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
    // ... если данных нет - удаляем элемент
    var popupCapacityElement = cardElement.querySelector('.popup__text--capacity');
    try {
      var capacityText = currentOffer.offer.rooms + ' комнаты для ' + currentOffer.offer.guests + ' гостей';
      popupCapacityElement.textContent = capacityText;
    } catch (e) {
      popupCapacityElement.parentNode.removeChild(popupCapacityElement);
    }
  }

  function renderPlaceTime(currentOffer, cardElement) {
    // Показываем время заезда
    // ... если данных нет - удаляем элемент
    var popupTimeElement = cardElement.querySelector('.popup__text--time');
    try {
      var timeText = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout;
      popupTimeElement.textContent = timeText;
    } catch (e) {
      popupTimeElement.parentNode.removeChild(popupTimeElement);
    }
  }

  function renderPlaceFeatures(currentOffer, cardElement) {
    // Показываем преимущества
    // ... если данных нет - удаляем элемент
    var popupFeaturesElement = cardElement.querySelector('.popup__features');
    try {
      popupFeaturesElement.innerHTML = '';
      var featuresElements = createModalFeatures(currentOffer.offer.features);
      featuresElements.forEach(function (elem) {
        popupFeaturesElement.appendChild(elem);
      });
    } catch (e) {
      popupFeaturesElement.parentNode.removeChild(popupFeaturesElement);
    }
  }

  function renderPlaceImages(currentOffer, cardElement) {
    // Показываем фотографии жилья
    // ... если данных нет - удаляем элемент
    var popupImagesElement = cardElement.querySelector('.popup__photos');
    try {
      var imagesWrapperElement = cardElement.querySelector('.popup__photos');
      var imageElement = cardElement.querySelector('.popup__photo');
      var imageCopy = imageElement.cloneNode();
      var photosArray = currentOffer.offer.photos;
      var photosFragment = document.createDocumentFragment();
      imagesWrapperElement.innerHTML = '';

      photosArray.forEach(function (imageSrc) {
        var secondImageCopy = imageCopy.cloneNode();
        secondImageCopy.src = imageSrc;
        photosFragment.appendChild(secondImageCopy);
      });

      imagesWrapperElement.appendChild(photosFragment);
    } catch (e) {
      popupImagesElement.parentNode.removeChild(popupImagesElement);
    }
  }

  function renderPlaceAvatar(currentOffer, cardElement) {
    // Показываем аватарку
    // ... если данных нет - удаляем элемент
    var popupAvatarElement = cardElement.querySelector('.popup__avatar');
    try {
      popupAvatarElement.src = currentOffer.author.avatar;
    } catch (e) {
      popupAvatarElement.parentNode.removeChild(popupAvatarElement);
    }
  }

  function renderPlaceTitle(currentOffer, cardElement) {
    // Показываем заголовок
    // ... если данных нет - удаляем элемент
    var popupTitleElement = cardElement.querySelector('.popup__title');
    try {
      popupTitleElement.textContent = currentOffer.offer.title;
    } catch (e) {
      popupTitleElement.parentNode.removeChild(popupTitleElement);
    }
  }

  function renderPlaceDescription(currentOffer, cardElement) {
    // Показываем описание
    // ... если данных нет - удаляем элемент
    var popupDescriptionElement = cardElement.querySelector('.popup__description');
    try {
      popupDescriptionElement.textContent = currentOffer.offer.description;
    } catch (e) {
      popupDescriptionElement.parentNode.removeChild(popupDescriptionElement);
    }
  }

  function renderPlaceAddress(currentOffer, cardElement) {
    // Показываем аватарку
    // ... если данных нет - удаляем элемент
    var popupAddressElement = cardElement.querySelector('.popup__text--address');
    try {
      popupAddressElement.textContent = currentOffer.offer.address;
    } catch (e) {
      popupAddressElement.parentNode.removeChild(popupAddressElement);
    }
  }

  function renderPlacePrice(currentOffer, cardElement) {
    // Показываем цену
    // ... если данных нет - удаляем элемент
    var popupPriceElement = cardElement.querySelector('.popup__text--price');
    try {
      popupPriceElement.textContent = currentOffer.offer.price + '₽/ночь';
    } catch (e) {
      popupPriceElement.parentNode.removeChild(popupPriceElement);
    }
  }

  // Создаем модальный элемент с описанием объявления
  function createModalElement(currentOffer) {
    // Создаем копию карточки
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    renderPlaceType(currentOffer, cardElement);
    renderPlaceCapacity(currentOffer, cardElement);
    renderPlaceTime(currentOffer, cardElement);
    renderPlaceFeatures(currentOffer, cardElement);
    renderPlaceTitle(currentOffer, cardElement);
    renderPlaceImages(currentOffer, cardElement);
    renderPlaceDescription(currentOffer, cardElement);
    renderPlaceAvatar(currentOffer, cardElement);
    renderPlaceAddress(currentOffer, cardElement);
    renderPlacePrice(currentOffer, cardElement);
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
