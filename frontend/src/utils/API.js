const APIToken = {
  url: 'https://api.mesto-mern.nomoreparties.sbs',
  token: localStorage.getItem('JWT')
}

class API {
  constructor({url, token}) {
    this._url = url;
    this._authorization = `Bearer ${token}`;
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