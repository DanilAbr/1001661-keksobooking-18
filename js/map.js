'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');
  var mapPinMainTop = parseInt(mapPinMain.style.top, 10);
  var mapPinMainLeft = parseInt(mapPinMain.style.left, 10);
  var mapPinMainCenter = Math.round(mapPinMain.offsetWidth / 2);
  var mainPinAddress = (mapPinMainLeft + mapPinMainCenter) + ', ' + (mapPinMainTop + mapPinMainCenter * 2);
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
    mainAddress.value = mainPinAddress;
    window.load(success, error);
  }

  mapPinMain.addEventListener('click', function () {
    toActiveMode();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      toActiveMode();
    }
  });

  mainAddress.value = mainPinAddress;
})();
