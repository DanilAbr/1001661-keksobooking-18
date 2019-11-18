'use strict';

(function () {
  // Создаем пин
  function getPin(pinData) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    pin.dataset.id = pinData.id;

    function deactivatePins() {
      var activePins = document.querySelectorAll('.map__pin--active');
      activePins.forEach(function (item) {
        item.classList.remove('map__pin--active');
      });
    }

    function setOnPinClick() {
      pin.addEventListener('click', function (element) {
        deactivatePins();
        pin.classList.add('map__pin--active');

        var pinNumber = element.currentTarget.dataset.id;

        var currentOrderData = window.ordersData.find(function (item) {
          return item.id.toString() === pinNumber;
        });

        window.card.createModalElement(currentOrderData);
      });
    }

    setOnPinClick();

    pin.style = 'left: ' + pinData.location.x + 'px; top: ' + pinData.location.y + 'px;';
    pin.querySelector('img').src = pinData.author.avatar;
    pin.querySelector('img').alt = pinData.offer.title;

    return pin;
  }

  // Удаляем пины
  function deletePins() {
    var pins = window.data.map.querySelectorAll('.map__pin:not(.map__pin--main');

    pins.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  }

  // Выводим пины на карту
  function render(pinsArray) {
    var pins = pinsArray.map(function (item) {
      return getPin(item);
    });

    pins.forEach(function (item) {
      window.data.map.appendChild(item);

      // Корректируем положение пинов
      var leftStyle = item.offsetLeft - (item.offsetWidth / 2);
      var topStyle = item.offsetTop - item.offsetHeight;
      item.style = 'left: ' + leftStyle + 'px; top: ' + topStyle + 'px;';
    });
  }

  window.pin = {
    render: render,
    delete: deletePins,
  };
})();
