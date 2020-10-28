// class UserInfo {
//   constructor({ name, job, avatar }) {
//     this._name = name;
//     this._job = job;
   
//   }

//   getUserInfo() {
    
//     return {
//       userName: this._name.textContent,
//       userJob: this._job.textContent,
      
//     };
//   }

//   setUserInfo({ userName, userJob, userAvatar }) {
//     this._name.textContent = userName;
//     this._job.textContent = userJob;
    
//   }
// }

class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userJob: this._job.textContent,
      userAvatar: this._avatar.style.backgroundImage
    };
  }

  setUserInfo({ userName, userJob, userAvatar }) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
    this._avatar.style.backgroundImage = `url(${userAvatar})`
  }
}

export default UserInfo;
