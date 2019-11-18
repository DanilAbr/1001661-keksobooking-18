'use strict';

(function () {
  var CODE_SUCCESS = 200;
  var timeout = 10000;

  // type = load || upload
  function sendRequest(type, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var requestMethod;
    var requestUrl;

    if (type === 'load') {
      requestMethod = 'GET';
      requestUrl = 'https://js.dump.academy/keksobooking/data';
    } else if (type === 'upload') {
      requestMethod = 'POST';
      requestUrl = 'https://js.dump.academy/keksobooking';
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        var errorMessage = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        onError(errorMessage);
      }
    });

    xhr.timeout = timeout;
    xhr.open(requestMethod, requestUrl);

    if (type === 'load') {
      xhr.send();
    } else if (type === 'upload') {
      xhr.send(data);
    }
  }

  window.sendRequest = sendRequest;
})();
