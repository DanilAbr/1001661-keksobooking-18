'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');

  window.data = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    map: map,
    ESC_KEYCODE: ESC_KEYCODE,
  };
})();
