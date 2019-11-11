'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');
  var inputType = document.querySelector('#housing-type');
  var inputRooms = document.querySelector('#housing-rooms');
  var inputGuests = document.querySelector('#housing-guests');
  var inputPrice = document.querySelector('#housing-price');
  var ENTER_KEYCODE = 13;

  createNoActiveAddress();

  // Переводим в активный режим
  function toActiveMode() {
    var mapCheckbox = document.querySelectorAll('.map__checkbox');
    var filterForm = document.querySelector('.map__filters');

    createAddress();

    function success(data) {
      data.forEach(function (item, i) {
        item.id = i;
      });
      window.ordersData = data;
      window.pin.renderPins(getFilterPins());
    }

    // Отображаем отфильтрованные пины
    function displayPins() {
      window.pin.deletePins();
      window.pin.renderPins(getFilterPins());
    }

    // Фильтруем пины
    function getFilterPins() {
      var filterPins = window.ordersData.
        filter(function (it) {
          return it.offer.type === inputType.value || inputType.value === 'any';
        }).
        filter(function (it) {
          function getValue() {
            var itPrice = it.offer.price;
            var value = 'any';
            if (itPrice < 10000) {
              value = 'low';
            } else if (itPrice >= 10000 && itPrice <= 50000) {
              value = 'middle';
            } else {
              value = 'high';
            }
            return value;
          }
          return getValue() === inputPrice.value || inputPrice.value === 'any';
        }).
        filter(function (it) {
          return it.offer.rooms === Number(inputRooms.value) || inputRooms.value === 'any';
        }).
        filter(function (it) {
          return it.offer.guests === Number(inputGuests.value) || inputGuests.value === 'any';
        });

      var additionalyParams = window.additionalyParams;
      for (var key in additionalyParams) {
        if (additionalyParams.hasOwnProperty(key)) {
          filterPins = filterPins.filter(function (it) {
            if (additionalyParams[key]) {
              return it.offer.features.includes(key);
            }
            return true;
          });
        }
      }

      filterPins = filterPins.slice(0, 5);
      return filterPins;
    }

    mapCheckbox.forEach(function (item) {
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

    window.form.allNoDisabled();
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.mapFilters.classList.remove('ad-form--disabled');
    window.load(success);

    var displayPinsWrapper = window.debounce(displayPins);

    filterForm.addEventListener('change', function () {
      displayPinsWrapper();
      window.card.deleteCard();
    });
  }

  pinMain.addEventListener('mousedown', function () {
    toActiveMode();
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      toActiveMode();
    }
  });

  function createNoActiveAddress() {
    var pinMainTop = parseInt(pinMain.style.top, 10);
    var pinMainLeft = parseInt(pinMain.style.left, 10);
    var pinMainCenter = Math.round(pinMain.offsetWidth / 2);
    var mainPinAddress = (pinMainLeft + pinMainCenter) + ', ' + (pinMainTop + pinMainCenter);
    mainAddress.value = mainPinAddress;
  }

  window.createNoActiveAddress = createNoActiveAddress;

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
      var maxX = map.clientWidth - pinMainWidth / 2;

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
