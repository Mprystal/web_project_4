let editButton = document.querySelector(".profile__edit-button");
let closedButton = document.querySelector(".popup__button");
let popup = document.querySelector(".popup");
let form = document.querySelector(".popup__container");

let togglePopup = () => {
  popup.classList.toggle("popup_opened");
};

editButton.addEventListener("click", togglePopup);

closedButton.addEventListener("click", togglePopup);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameInput = form.querySelector(".popup__user-input_type_name");
  let aboutInput = form.querySelector(".popup__user-input_type_about");

  let userName = document.querySelector(".profile__name");
  let userAbout = document.querySelector(".profile__occupation");

  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value;

  togglePopup();

  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
});
