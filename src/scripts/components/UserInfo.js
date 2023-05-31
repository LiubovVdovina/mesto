export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      id: this._id,
      avatar: this._avatarElement.src
    }
    return(userInfo);
  }

  setUserInfo({ name, job, id, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._id = id;
    if (avatar) {
      this.setAvatar(avatar);
    }
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}