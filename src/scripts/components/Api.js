export class Api {
  constructor(options) {
    this._token = options.token;
    this._cohortId = options.cohortId;
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo(userData) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUserAvatar(link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(cardData) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
  }

  deleteCard(id) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }  
    })
    .catch((err) => console.log(err));
  }

  addCardLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);  
    })
    .catch((err) => console.log(err));
  }

  deleteCardLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);  
    })
    .catch((err) => console.log(err));
  }
}