export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._getResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then(this._getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._getResponse);
  }

  createCardData(data) {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.inputNameCard,
        link: data.inputLink,
      }),
    }).then(this._getResponse);
  }

  changeProfile(data) {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.inputName,
        about: data.inputInfo,
      }),
    }).then(this._getResponse);
  }
 
  likeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._getResponse);
  }

  deleteLikesCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._getResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.inputLinkAvatar,
      }),
    }).then(this._getResponse);
  }
}

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-74/',
  headers: {
    authorization: '14de6b5f-9b3a-4edf-99d7-b6af4d676b94',
    'Content-Type': 'application/json'
  }
};

