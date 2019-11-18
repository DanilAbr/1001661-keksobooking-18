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
  var guestsOptions = selectGuests.querySelectorAll('option');
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
      item.disabled = true;
    });
  }

  // Удаляем аттрибут disabled
  function enableSome(array) {
    array.forEach(function (item) {
      item.disabled = false;
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

  // Блокируем любой выбор
  setGuestsValuesDisabled(guestsOptions);
  // Убираем варианты выбора количества гостей в зависимости от выбранного количества комнат
  selectRooms.onchange = function () {
    setGuestsValues(guestsOptions, this.value);
  };

  var availableOptionsForRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  function setGuestsValuesDisabled(options) {
    options.forEach(function (option) {
      option.disabled = true;
    });
  }

  function setGuestsValues(options, currentRoomsCount) {
    // Отключаем все поля
    setGuestsValuesDisabled(guestsOptions);
    options.forEach(function (option) {
      // Снимаем весь выбор
      option.selected = false;
      // Массив со списком доступных гостей для выбранного количества комнат
      var availableOptions = availableOptionsForRooms[currentRoomsCount];
      // Для предвыбора выбираем максимальное значение гостей
      var targetValue = availableOptions[availableOptions.length - 1];
      // Если текущее значение опции входит в список доступных - убираем атрибут disabled
      if (availableOptions.includes(option.value)) {
        option.disabled = false;
      }
      // Если текущее значение опции совпадает с доступным максимальным значением гостей - устанавливаем selected true
      if (option.value === targetValue) {
        option.selected = true;
      }
    });
  }

  // Изменяем значение минимальной цены в зависимости от типа жилья
  selectType.onchange = function () {
    switch (this.value) {
      case 'flat':
        price.min = MIN_PRICE_FLAT;
        price.placeholder = MIN_PRICE_FLAT;
        break;
      case 'house':
        price.min = MIN_PRICE_HOUSE;
        price.placeholder = MIN_PRICE_HOUSE;
        break;
      case 'palace':
        price.min = MIN_PRICE_PALACE;
        price.placeholder = MIN_PRICE_PALACE;
        break;
      default:
        price.min = MIN_PRICE_BUNGALO;
        price.placeholder = MIN_PRICE_BUNGALO;
        break;
    }
  };

  function setBothValues(value) {
    timeIn.value = value;
    timeOut.value = value;
  }

  timeIn.addEventListener('change', function (e) {
    setBothValues(e.currentTarget.value);
  });

  timeOut.addEventListener('change', function (e) {
    setBothValues(e.currentTarget.value);
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

    window.dataLoaded = false;

    function onSuccessElementClick() {
      window.data.map.removeChild(successElement);
      removeEventListeners();
    }

    function onSuccessEscPress(evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        successElement.remove();
        removeEventListeners();
      }
    }

    function removeEventListeners() {
      successElement.removeEventListener('click', onSuccessElementClick);
      document.removeEventListener('keydown', onSuccessEscPress);
    }

    successElement.addEventListener('click', onSuccessElementClick);
    document.addEventListener('keydown', onSuccessEscPress);

  }
  // Создаем сообщение об ошибке
  function createErrorMessage() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    main.appendChild(errorElement);

    window.dataLoaded = false;

    function onErrorElementClick() {
      errorElement.remove();
      removeEventListeners();
    }

    function onErrorEscPress(evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        errorElement.remove();
        removeEventListeners();
      }
    }

    function removeEventListeners() {
      errorElement.removeEventListener('click', onErrorElementClick);
      document.removeEventListener('keydown', onErrorEscPress);
    }

    errorElement.addEventListener('click', onErrorElementClick);
    document.addEventListener('keydown', onErrorEscPress);
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
    window.pin.delete();
    window.map.createNoActiveAddress();
    window.loadphoto.deletePhoto();

    // Корретно предзаполняем начальное состояние формы
    setGuestsValues(guestsOptions, selectRooms.value);
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
    window.dataLoaded = false;
    removeActiveState();
  });

  // Корретно предзаполняем начальное состояние формы
  setGuestsValues(guestsOptions, selectRooms.value);

  window.form = {
    enableAll: enableAll,
    add: adForm,
    mapFilters: mapFilters,
  };
})();
