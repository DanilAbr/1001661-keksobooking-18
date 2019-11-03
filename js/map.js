'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');
  var mapPinMainTop = parseInt(mapPinMain.style.top, 10);
  var mapPinMainLeft = parseInt(mapPinMain.style.left, 10);
  var mapPinMainCenter = Math.round(mapPinMain.offsetWidth / 2);
  var mainPinAddress = (mapPinMainLeft + mapPinMainCenter) + ', ' + (mapPinMainTop + mapPinMainCenter * 2);
  var pinsContainer = document.querySelector('.map__pins');
  var ENTER_KEYCODE = 13;

  // Переводим в активный режим
  var toActiveMode = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.fieldsetActive();
    window.form.mapFilters.classList.remove('ad-form--disabled');
    mainAddress.value = mainPinAddress;
    pinsContainer.appendChild(window.pin.fragmentPins);
    map.appendChild(window.card.createModalElement());
  };

  mapPinMain.addEventListener('mousedown', function () {
    toActiveMode();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      toActiveMode();
    }
  });

  mainAddress.value = mainPinAddress;
})();
