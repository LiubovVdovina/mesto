export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  sendUserInfo({ name, job }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method:  'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: job })
    })
    .then(res => {
      if (res.ok) {
        return Promise.resolve();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  sendCardInfo({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method:  'POST',
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method:  'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return Promise.resolve('Запрос на удаление выполнен успешно');
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method:  'PUT',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method:  'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  sendAvatarInfo(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method:  'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.src })
    })
    .then(res => {
      if (res.ok) {
        return Promise.resolve();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }
}