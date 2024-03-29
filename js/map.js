'use strict';

(function () {
  var SUM_PINS = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var pinMain = document.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');
  var inputType = document.querySelector('#housing-type');
  var inputRooms = document.querySelector('#housing-rooms');
  var inputGuests = document.querySelector('#housing-guests');
  var housingPrice = document.querySelector('#housing-price');

  window.dataLoaded = false;

  createNoActiveAddress();

  // Переводим в активный режим
  function enterActiveMode() {
    var mapCheckboxes = document.querySelectorAll('.map__checkbox');
    var filterForm = document.querySelector('.map__filters');

    createAddress();

    function onSuccess(data) {
      window.dataLoaded = true;
      data.forEach(function (item, i) {
        item.id = i;
      });
      window.ordersData = data;
      window.pin.render(getFilterPins());
    }

    // Отображаем отфильтрованные пины
    function displayPins() {
      window.pin.delete();
      window.pin.render(getFilterPins());
    }

    function getPriceValue(item) {
      var value;
      var itemPrice = item.offer.price;
      if (itemPrice < MIN_PRICE) {
        return 'low';
      } else if (itemPrice >= MIN_PRICE && itemPrice <= MAX_PRICE) {
        return 'middle';
      } else if (itemPrice > MAX_PRICE) {
        return 'high';
      }
      return value;
    }

    function getFilterPins() {
      // additionalyParams - информация о том какие фильтры Доп параметров включены
      var additionalyParams = window.additionalyParams;
      // фильтруем основные параметры
      var filterPins = window.ordersData.filter(function (item) {
        return (item.offer.type === inputType.value || inputType.value === 'any') &&
          (getPriceValue(item) === housingPrice.value || housingPrice.value === 'any') &&
          (item.offer.rooms === Number(inputRooms.value) || inputRooms.value === 'any') &&
          (item.offer.guests === Number(inputGuests.value) || inputGuests.value === 'any') &&
          // Фильтруем пины в зависимости от включенных кнопок/фильтров Доп параметры
          item.offer.features.every(function (feature) {
            return !additionalyParams[feature];
          });
      });

      // Ограничиваем количество пинов
      filterPins = filterPins.slice(0, SUM_PINS);
      return filterPins;
    }

    mapCheckboxes.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        window.additionalyParams[evt.currentTarget.value] = evt.currentTarget.checked;
      });
    });

    window.additionalyParams = {
      wifi: false,
      parking: false,
      dishwasher: false,
      washer: false,
      elevator: false,
      conditioner: false,
    };

    window.form.enableAll();
    window.data.map.classList.remove('map--faded');
    window.form.add.classList.remove('ad-form--disabled');
    window.form.mapFilters.classList.remove('ad-form--disabled');
    window.sendRequest('load', onSuccess, function () {});

    var displayPinsWrapper = window.debounce(displayPins);

    filterForm.addEventListener('change', function () {
      displayPinsWrapper();
      window.card.delete();
    });
  }

  pinMain.addEventListener('mousedown', function () {
    if (!window.dataLoaded) {
      enterActiveMode();
    }
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE && !window.dataLoaded) {
      enterActiveMode();
    }
  });

  function createNoActiveAddress() {
    var pinMainTop = parseInt(pinMain.style.top, 10);
    var pinMainLeft = parseInt(pinMain.style.left, 10);
    var pinMainCenter = Math.round(pinMain.offsetWidth / 2);
    var mainPinAddress = (pinMainLeft + pinMainCenter) + ', ' + (pinMainTop + pinMainCenter);
    mainAddress.value = mainPinAddress;
  }

  // Создаем адрес для поля "Адрес"
  function createAddress() {
    var pinMainTop = parseInt(pinMain.style.top, 10);
    var pinMainLeft = parseInt(pinMain.style.left, 10);
    var pinMainCenter = Math.round(pinMain.offsetWidth / 2);
    var pinMainBottom = Math.round(pinMain.offsetHeight + 10);
    var mainPinAddress = (pinMainLeft + pinMainCenter) + ', ' + (pinMainTop + pinMainBottom);
    mainAddress.value = mainPinAddress;
  }

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      var pinMainHeight = pinMain.clientHeight;
      var pinMainWidth = pinMain.clientWidth;
      var minY = 120 - pinMainHeight;
      var maxY = 620 - pinMainHeight;
      var minX = -(pinMainWidth / 2);
      var maxX = window.data.map.clientWidth - pinMainWidth / 2;

      if (pinMain.offsetTop < minY || pinMain.offsetTop > maxY) {
        pinMain.style.top = (pinMain.offsetTop + shift.y) + 'px';
      }

      if (pinMain.offsetLeft < minX || pinMain.offsetLeft > maxX) {
        pinMain.style.left = (pinMain.offsetLeft + shift.x) + 'px';
      }
      createAddress();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    createAddress: createAddress,
    createNoActiveAddress: createNoActiveAddress,
  };
})();
