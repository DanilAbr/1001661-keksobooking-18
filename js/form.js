'use strict';

(function () {
  var fieldset = document.querySelectorAll('.ad-form__element');
  var selectRooms = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
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

  // Добавляем аттрибут disabled всем <input> и <select> формы .ad-form
  function fieldsetDisabled() {
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].setAttribute('disabled', true);
    }
  }

  // Удаляем аттрибут disabled всем <input> и <select> формы .ad-form
  function fieldsetActive() {
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].removeAttribute('disabled', true);
    }
  }

  fieldsetDisabled();
  mapFilters.classList.add('ad-form--disabled');

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
      case 'bungalo':
        price.setAttribute('min', 0);
        price.setAttribute('placeholder', 0);
        break;
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
    }
  };

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var URL = 'https://js.dump.academy/keksobooking';
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

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      window.card.deleteCards();
      window.deletePins();
      adForm.reset();
      returnPinMain();
      window.createAddress();
      createSuccessMessage();
    });
    evt.preventDefault();
  });

  window.form = {
    fieldsetActive: fieldsetActive,
    adForm: adForm,
    mapFilters: mapFilters,
  };
})();
