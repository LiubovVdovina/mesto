export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
      
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, { method, headers, body }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers,
      body
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    return this._request('/users/me', { method: 'GET', headers: this._headers });
  }

  sendUserInfo({ name, job }) {
    return this._request('/users/me', { method: 'PATCH', headers: this._headers, body: JSON.stringify({ name: name, about: job })});
  }

  getInitialCards() {
    return this._request('/cards', {method: 'GET', headers: this._headers});
  }

  sendCardInfo({ name, link }) {
    return this._request('/cards', { method: 'POST', headers: this._headers, body: JSON.stringify({ name, link })});
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, {method: 'DELETE', headers: this._headers});
  }

  putLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {method: 'PUT', headers: this._headers});
  }

  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {method: 'DELETE', headers: this._headers});
  }

  sendAvatarInfo(data) {
    return this._request('/users/me/avatar', { method: 'PATCH', headers: this._headers, body: JSON.stringify({ avatar: data.src })});
  }
}