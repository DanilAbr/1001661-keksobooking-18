'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('.ad-form__element');
  var selectRooms = adForm.querySelector('#room_number');
  var selectGuests = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var selectType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var main = document.querySelector('main');
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainStartX = parseInt(pinMain.style.top, 10);
  var pinMainStartY = parseInt(pinMain.style.left, 10);

  var fieldsetsFilter = document.querySelectorAll('.map__features');
  var selectFilter = document.querySelectorAll('.map__filter');
  var mapFilters = document.querySelector('.map__filters');

  disableAll();

  // Добавляем аттрибут disabled
  function disableSome(array) {
    array.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  }

  // Удаляем аттрибут disabled
  function enableSome(array) {
    array.forEach(function (item) {
      item.removeAttribute('disabled', true);
    });
  }

  // Блокируем <input> и <select> формы и фильтрации объявлений
  function disableAll() {
    disableSome(fieldsets);
    disableSome(fieldsetsFilter);
    disableSome(selectFilter);
  }
  // Разблокируем <input> и <select> формы и фильтрации объявлений
  function enableAll() {
    enableSome(fieldsets);
    enableSome(fieldsetsFilter);
    enableSome(selectFilter);
  }

  selectGuests.options[0].setAttribute('disabled', true);
  selectGuests.options[1].setAttribute('disabled', true);
  selectGuests.options[3].setAttribute('disabled', true);
  selectGuests.options[2].setAttribute('selected', true);
  // Убираем варианты выбора количества гостей в зависимости от выбранного количества комнат
  selectRooms.onchange = function () {
    selectGuests.options[0].removeAttribute('selected', true);
    selectGuests.options[1].removeAttribute('selected', true);
    selectGuests.options[2].removeAttribute('selected', true);
    selectGuests.options[3].removeAttribute('selected', true);
    selectGuests.options[2].setAttribute('selected', true);
    switch (this.value) {
      case '1':
        selectGuests.options[0].setAttribute('disabled', true);
        selectGuests.options[1].setAttribute('disabled', true);
        selectGuests.options[2].removeAttribute('disabled', true);
        selectGuests.options[3].setAttribute('disabled', true);
        break;
      case '2':
        selectGuests.options[0].setAttribute('disabled', true);
        selectGuests.options[1].removeAttribute('disabled', true);
        selectGuests.options[2].removeAttribute('disabled', true);
        selectGuests.options[3].setAttribute('disabled', true);
        break;
      case '3':
        selectGuests.options[0].removeAttribute('disabled', true);
        selectGuests.options[1].removeAttribute('disabled', true);
        selectGuests.options[2].removeAttribute('disabled', true);
        selectGuests.options[3].setAttribute('disabled', true);
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

  // Изменяем значение минимальной цены в зависимости от типа жилья
  selectType.onchange = function () {
    switch (this.value) {
      case 'flat':
        price.setAttribute('min', MIN_PRICE_FLAT);
        price.setAttribute('placeholder', MIN_PRICE_FLAT);
        break;
      case 'house':
        price.setAttribute('min', MIN_PRICE_HOUSE);
        price.setAttribute('placeholder', MIN_PRICE_HOUSE);
        break;
      case 'palace':
        price.setAttribute('min', MIN_PRICE_PALACE);
        price.setAttribute('placeholder', MIN_PRICE_PALACE);
        break;
      default:
        price.setAttribute('min', MIN_PRICE_BUNGALO);
        price.setAttribute('placeholder', MIN_PRICE_BUNGALO);
        break;
    }
  };

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  // Возвращаем главный пин на изначальное место
  function returnPinMain() {
    pinMain.style.top = pinMainStartX + 'px';
    pinMain.style.left = pinMainStartY + 'px';
  }

  // Выводим сообщение об успешной отправке формы
  function createSuccessMessage() {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    window.data.map.appendChild(successElement);

    successElement.addEventListener('click', function () {
      window.data.map.removeChild(successElement);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        successElement.remove();
      }
    });
  }
  // Создаем сообщение об ошибке
  function createErrorMessage() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    main.appendChild(errorElement);

    errorElement.addEventListener('click', function () {
      errorElement.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        errorElement.remove();
      }
    });
  }

  // Переводим в неактивный режим
  function removeActiveState() {
    window.data.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('ad-form--disabled');
    disableAll();
    adForm.reset();
    mapFilters.reset();
    returnPinMain();
    window.card.delete();
    window.pin.deletePins();
    window.map.createNoActiveAddress();
    window.loadphoto.deletePhoto();
  }

  function onSuccess() {
    removeActiveState();
    createSuccessMessage();
  }

  adForm.addEventListener('submit', function (evt) {
    var formData = new FormData(adForm);
    window.sendRequest('upload', onSuccess, createErrorMessage, formData);
    evt.preventDefault();
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    removeActiveState();
  });

  window.form = {
    enableAll: enableAll,
    adForm: adForm,
    mapFilters: mapFilters,
  };
})();
