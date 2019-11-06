'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');
  var ENTER_KEYCODE = 13;

  createAddress();

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

  pinMain.addEventListener('mousedown', function () {
    toActiveMode();
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      toActiveMode();
    }
  });

  // Создаем адрес для поля "Адрес"
  function createAddress() {
    var pinMainTop = parseInt(pinMain.style.top, 10);
    var pinMainLeft = parseInt(pinMain.style.left, 10);
    var pinMainCenter = Math.round(pinMain.offsetWidth / 2);
    var mainPinAddress = (pinMainLeft + pinMainCenter) + ', ' + (pinMainTop + pinMainCenter * 2);
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
      var minY = 129 - pinMainHeight;
      var maxY = 629 - pinMainHeight;
      var minX = 0;
      var maxX = map.clientWidth - pinMain.clientWidth;

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

  window.createAddress = createAddress;
})();
