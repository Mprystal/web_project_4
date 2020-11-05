class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
    this.inputNameSelector = document.querySelector(".popup__user-input_type_name");
    this.inputAboutSelector = document.querySelector(".popup__user-input_type_about");

  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userJob: this._job.textContent,
      userAvatar: this._avatar.style.backgroundImage,
        //  : this.inputAboutSelector.value
    };
  }

  setUserInfo({ userName, userJob, userAvatar }) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
    this._avatar.style.backgroundImage = `url(${userAvatar})`;
    this.inputNameSelector.value = userName;
    this.inputAboutSelector.value = userJob;
  }
}

export default UserInfo;
