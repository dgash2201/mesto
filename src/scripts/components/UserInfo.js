export default class UserInfo {
  constructor({usernameSelector, statusSelector, avatarSelector}) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._statusElement = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      username: this._usernameElement.textContent,
      status: this._statusElement.textContent,
    };
  }

  getUserId() {
    return this._id;
  }

  setUserInfo(userData) {
    this._id = userData._id;
    this._usernameElement.textContent = userData.name;
    this._statusElement.textContent = userData.about;
    this.setUserAvatar(userData.avatar);
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }
}