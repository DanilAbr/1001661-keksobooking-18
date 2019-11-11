'use strict';

(function () {
  var fieldset = document.querySelectorAll('.ad-form__element');
  var selectRooms = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');
  var selectFilter = document.querySelectorAll('.map__filter');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var selectType = document.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainStartX = parseInt(pinMain.style.top, 10);
  var pinMainStartY = parseInt(pinMain.style.left, 10);
  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var URL = 'https://js.dump.academy/keksobooking';

  var fieldsetFilter = document.querySelectorAll('.map__features');

  allDisabled();

  // Добавляем аттрибут disabled
  function someDisabled(arr) {
    arr.forEach(function (it) {
      it.setAttribute('disabled', true);
    });
  }

  // Удаляем аттрибут disabled
  function someNoDisabled(arr) {
    arr.forEach(function (it) {
      it.removeAttribute('disabled', true);
    });
  }

  // Блокируем <input> и <select> формы и фильтрации объявлений
  function allDisabled() {
    someDisabled(fieldset);
    someDisabled(fieldsetFilter);
    someDisabled(selectFilter);
  }
  // Разблокируем <input> и <select> формы и фильтрации объявлений
  function allNoDisabled() {
    someNoDisabled(fieldset);
    someNoDisabled(fieldsetFilter);
    someNoDisabled(selectFilter);
  }

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
        price.setAttribute('min', 1000);
        price.setAttribute('placeholder', 1000);
        break;
      case 'house':
        price.setAttribute('min', 5000);
        price.setAttribute('placeholder', 5000);
        break;
      case 'palace':
        price.setAttribute('min', 10000);
        price.setAttribute('placeholder', 10000);
        break;
      default:
        price.setAttribute('min', 0);
        price.setAttribute('placeholder', 0);
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
    map.appendChild(successElement);

    successElement.addEventListener('click', function () {
      map.removeChild(successElement);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
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
      if (evt.keyCode === ESC_KEYCODE) {
        errorElement.remove();
      }
    });
  }

  // Переводим в неактивный режим
  function noActiveState() {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('ad-form--disabled');
    allDisabled();
    adForm.reset();
    mapFilters.reset();
    returnPinMain();
    window.card.deleteCard();
    window.pin.deletePins();
    window.map.createNoActiveAddress();
  }

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      noActiveState();
      createSuccessMessage();
    });
    evt.preventDefault();
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    noActiveState();
  });

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        createErrorMessage();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.form = {
    allNoDisabled: allNoDisabled,
    adForm: adForm,
    mapFilters: mapFilters,
  };
})();
