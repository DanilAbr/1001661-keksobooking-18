'use strict';

(function () {
  var pinDataArray = [];

  for (var i = 0; i < window.data.sumPins; i++) {
    pinDataArray.push(window.data.offerDescription());

    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    // Создаем пины и заполняем их данными из массива
    var getPin = function (pinData) {
      var pin = pinTemplate.cloneNode(true);
      var pinStyleLeft = pinData.location.x - pin.offsetWidth / 2;
      var pinStyleRight = pinData.location.y - pin.offsetHeight;

      pin.style = 'left: ' + pinStyleLeft + 'px; top: ' + pinStyleRight + 'px;';
      pin.querySelector('img').src = pinData.author.avatar;
      pin.querySelector('img').alt = pinData.offer.title;

      return pin;
    };
  }

  var fragmentPins = document.createDocumentFragment();
  for (var j = 0; j < window.data.sumPins; j++) {
    fragmentPins.appendChild(getPin(pinDataArray[j]));
  }

  window.pin = {
    pinDataArray: pinDataArray,
    fragmentPins: fragmentPins,
  };
})();
