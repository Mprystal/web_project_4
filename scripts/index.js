import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const editForm = document.querySelector(".popup__form");
const addForm = document.querySelector(".popup__add-form");

const defaultConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__user-input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormValidator = new FormValidator(defaultConfig, editForm);
const addFormValidator = new FormValidator(defaultConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const editButton = document.querySelector(".profile__edit-button");
const closedButton = document.querySelector(".popup__close-button");

const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const addCardPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image");

const nameInput = editForm.querySelector(".popup__user-input_type_name");
const aboutInput = editForm.querySelector(".popup__user-input_type_about");

const headingInput = addForm.querySelector(".popup__user-input_card-heading");
const imageUrlInput = addForm.querySelector(".popup__user-input_url");

const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__occupation");

const addCardPopupButton = document.querySelector(".profile__add-button");

addCardPopupButton.addEventListener("click", () => {
  /// toggle popup
  togglePopup(addCardPopup);
});

const closeAddCardButton = addCardPopup.querySelector(".popup__close-button");

closeAddCardButton.addEventListener("click", () => {
  togglePopup(addCardPopup);
});

const closeImageButton = imagePopup.querySelector(".popup__close-button");

closeImageButton.addEventListener("click", () => {
  togglePopup(imagePopup);
});

const handleEscape = (e) => {
  if (e.key === "Escape") {
    closePopup(addCardPopup);
    closePopup(editProfilePopup);
    closePopup(imagePopup);
  }
};

const togglePopup = (popupT) => {
  if (popupT.classList.contains("popup_opened")) {
    document.removeEventListener("keydown", handleEscape);
  } else {
    document.addEventListener("keydown", handleEscape);
  }
  popupT.classList.toggle("popup_opened");
};

editButton.addEventListener("click", () => {
  togglePopup(editProfilePopup);
});

closedButton.addEventListener("click", () => {
  togglePopup(editProfilePopup);
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value;

  togglePopup(editProfilePopup);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  renderCard({ name: headingInput.value, link: imageUrlInput.value });

  togglePopup(addCardPopup);
});

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const list = document.querySelector(".element");

const renderCard = (data) => {
  const card = new Card(data, ".element__card-template");
  list.prepend(card.generateCard());
};

initialCards.forEach((data) => {
  renderCard(data);
});

const closePopup = (popupT) => {
  popupT.classList.remove("popup_opened");
};

const popupOverlay = [...document.querySelectorAll(".popup")];

const overlayClose = (e) => {
  if (e.target.classList.contains("popup_opened")) {
    closePopup(addCardPopup);
    closePopup(editProfilePopup);
    closePopup(imagePopup);
  }
};

popupOverlay.forEach((element) => {
  element.removeEventListener("click", overlayClose);
  element.addEventListener("click", overlayClose);
});
