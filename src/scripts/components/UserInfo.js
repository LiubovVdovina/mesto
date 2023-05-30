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
    }
    return(userInfo);
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}