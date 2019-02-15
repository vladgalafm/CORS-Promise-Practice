const getRequest = (url) => {
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
};

getRequest('https://tanuhaua.github.io/datas-file-json/github_users.json')
  .then(response => {
    return JSON.parse(response);
  })
  .then(users => {
    const ghUsersBox = document.querySelector('.js-gh-users');

    users.forEach(user => {
      getRequest(`https://api.github.com/users/${user.githubName}`)
        .then(response => {
          const userData = JSON.parse(response);

          createUserBox(ghUsersBox, userData, user);
        })
        .catch(error => {
          console.log(error);
        });
    });
  })
  .catch(error => {
    console.log(error);
  });

function createUserBox(container, userData, user) {
  const userContainer = document.createElement('div');
  userContainer.className = 'github-users__user';
  container.appendChild(userContainer);

  const userAvatar = document.createElement('img');
  userAvatar.className = 'github-users__avatar';
  userAvatar.setAttribute('src', userData['avatar_url']);
  userAvatar.setAttribute('alt', user.githubName);
  userContainer.appendChild(userAvatar);

  const userFullname = document.createElement('span');
  userFullname.className = 'github-users__fullname';
  userFullname.innerHTML = user.fullName;
  userContainer.appendChild(userFullname);
}