'use strict';

(function () {
  function renderPins(pinsArray) {
    var map = document.querySelector('.map');

    var pins = pinsArray.map(function (item) {
      return getPin(item);
    });

    pins.forEach(function (item) {
      map.appendChild(item);
    });
  }

  function getPin(pinData) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    pin.dataset.id = pinData.id;

    pin.addEventListener('click', function (e) {
      var pinNumber = e.currentTarget.dataset.id;

      var currentOrderData = window.ordersData.find(function (item) {
        return item.id.toString() === pinNumber;
      });

      window.card.createModalElement(currentOrderData);
    });

    var pinStyleLeft = pinData.location.x - pin.offsetWidth / 2;
    var pinStyleRight = pinData.location.y - pin.offsetHeight;

    pin.style = 'left: ' + pinStyleLeft + 'px; top: ' + pinStyleRight + 'px;';
    pin.querySelector('img').src = pinData.author.avatar;
    pin.querySelector('img').alt = pinData.offer.title;

    return pin;
  }

  // Удаляем пины
  function deletePins() {
    var map = document.querySelector('.map');
    var pins = map.querySelectorAll('.map__pin');

    pins.forEach(function (item) {
      var isMainPin = item.classList.contains('map__pin--main');

      if (!isMainPin) {
        item.parentNode.removeChild(item);
      }
    });
  }

  window.renderPins = renderPins;
  window.deletePins = deletePins;
})();
