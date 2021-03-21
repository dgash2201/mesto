export default class UserInfo {
  constructor({usernameSelector, statusSelector,}) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._statusElement = document.querySelector(statusSelector);
  }

  getUserInfo() {
    return {
      username: this._usernameElement.textContent,
      status: this._statusElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._usernameElement.textContent = userData.username;
    this._statusElement.textContent = userData.status;
  }
}