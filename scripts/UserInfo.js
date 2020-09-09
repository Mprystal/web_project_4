class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userJob: this._job.textContent,
    };
  }

  setUserInfo({ userName, userJob }) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
  }
}

export default UserInfo;
