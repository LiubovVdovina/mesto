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
    fetch(`${this._baseUrl}/users/me`, {
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
    console.log('name: ', name, 'link: ', link);
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
}