'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');
  var ENTER_KEYCODE = 13;

  // Переводим в активный режим
  function toActiveMode() {
    function success(data) {
      data.forEach(function (item, i) {
        item.id = i;
      });
      window.ordersData = data;
      window.renderPins(data);
    }

    function error() {
    }

    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.fieldsetActive();
    window.form.mapFilters.classList.remove('ad-form--disabled');
    window.load(success, error);
  }

  mapPinMain.addEventListener('click', function () {
    toActiveMode();
    createAddress();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      toActiveMode();
    }
  });

  function createAddress() {
    var mapPinMainTop = parseInt(mapPinMain.style.top, 10);
    var mapPinMainLeft = parseInt(mapPinMain.style.left, 10);
    var mapPinMainCenter = Math.round(mapPinMain.offsetWidth / 2);
    var mainPinAddress = (mapPinMainLeft + mapPinMainCenter) + ', ' + (mapPinMainTop + mapPinMainCenter * 2);
    mainAddress.value = mainPinAddress;
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
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

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
