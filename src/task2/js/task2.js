function getRequest(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
      resolve(xhr.responseText);
    };
    xhr.onerror = function() {
      reject('Error');
    };

    xhr.send();
  });
}

getRequest('https://tanuhaua.github.io/datas-file-json/data.json')
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });