'use strict';

(function () {
  var fieldset = document.querySelectorAll('.ad-form__element');
  var selectRooms = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');

  // Добавляем аттрибут disabled всем <input> и <select> формы .ad-form
  var fieldsetDisabled = function () {
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].setAttribute('disabled', true);
    }
  };

  // Удаляем аттрибут disabled всем <input> и <select> формы .ad-form
  var fieldsetActive = function () {
    for (var k = 0; k < fieldset.length; k++) {
      fieldset[k].removeAttribute('disabled', true);
    }
  };

  fieldsetDisabled();
  mapFilters.classList.add('ad-form--disabled');

  selectGuests.options[2].setAttribute('selected', true);
  // Убираем варианты выбора количества гостей в зависимости от выбранного количества комнат
  selectRooms.onchange = function () {
    selectGuests.options[0].removeAttribute('selected', true);
    selectGuests.options[1].removeAttribute('selected', true);
    selectGuests.options[2].removeAttribute('selected', true);
    selectGuests.options[3].removeAttribute('selected', true);
    selectGuests.options[2].setAttribute('selected', true);
    switch (this.value) {
      case '1':
        selectGuests.options[0].setAttribute('disabled', true);
        selectGuests.options[1].setAttribute('disabled', true);
        selectGuests.options[2].removeAttribute('disabled', true);
        selectGuests.options[3].setAttribute('disabled', true);
        break;
      case '2':
        selectGuests.options[0].setAttribute('disabled', true);
        selectGuests.options[1].removeAttribute('disabled', true);
        selectGuests.options[2].removeAttribute('disabled', true);
        selectGuests.options[3].setAttribute('disabled', true);
        break;
      case '3':
        selectGuests.options[0].removeAttribute('disabled', true);
        selectGuests.options[1].removeAttribute('disabled', true);
        selectGuests.options[2].removeAttribute('disabled', true);
        selectGuests.options[3].setAttribute('disabled', true);
        break;
      case '100':
        selectGuests.options[0].setAttribute('disabled', true);
        selectGuests.options[1].setAttribute('disabled', true);
        selectGuests.options[2].setAttribute('disabled', true);
        selectGuests.options[3].removeAttribute('disabled', true);
        selectGuests.options[3].setAttribute('selected', true);
        break;
    }
  };

  window.form = {
    fieldsetActive: fieldsetActive,
    adForm: adForm,
    mapFilters: mapFilters,
  };
})();
