import { formName } from "./constatns";
import { formDescr } from "./constatns";

const APIToken = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-38',
  authorization: '81838a1e-c453-4d18-88cc-147b40de0a34'
}

class API {
  constructor({url, authorization}) {
    this._url = url;
    this._authorization = authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)
  }

  setProfileInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
      .then(this._checkResponse)
      .then(res => res)
  }

  setAvatar(avaratLink) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avaratLink
        })
      })
      .then(this._checkResponse)
      .then(res => res)
  }

  loadCard({name, link}) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this._checkResponse)
      .then(res => res)
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
      })
      .then(this._checkResponse)

  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkResponse)
  }

  renderLoading(isLoading, element) {
    if (isLoading) {
      element.textContent = 'Сохранение...';
    }
  }
}

const api = new API(APIToken);
export default api;