const editButton = document.querySelector(".profile__edit-button");
const closedButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__container");
const nameInput = form.querySelector(".popup__user-input_type_name");
const aboutInput = form.querySelector(".popup__user-input_type_about");

const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__occupation");

const togglePopup = () => {
  popup.classList.toggle("popup_opened");
};

editButton.addEventListener("click", togglePopup);

closedButton.addEventListener("click", togglePopup);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value;

  togglePopup();
});
