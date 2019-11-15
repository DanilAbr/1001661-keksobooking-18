'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MUFFIN_SRC = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var houseChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housePreviewWrap = document.querySelector('.ad-form__photo');

  var housePreview = document.createElement('img');
  housePreview.width = housePreviewWrap.offsetWidth;
  housePreview.height = housePreviewWrap.offsetHeight;
  housePreviewWrap.appendChild(housePreview);

  function loadPhoto(fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function deletePhoto() {
    avatarPreview.src = MUFFIN_SRC;
    housePreview.remove();
  }

  loadPhoto(avatarChooser, avatarPreview);
  loadPhoto(houseChooser, housePreview);

  window.loadphoto = {
    deletePhoto: deletePhoto,
  };
})();
