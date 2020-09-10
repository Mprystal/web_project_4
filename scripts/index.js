import "../page/index.css";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import { data } from "autoprefixer";

const list = document.querySelector(".element");

const editPopupSelector = ".popup_type_edit-profile";

const typeName = document.querySelector(".profile__name");
const typeJob = document.querySelector(".profile__occupation");

const profileInfo = new UserInfo({
  name: typeName,
  job: typeJob,
});

const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  formSubmit: (data) => {
    profileInfo.setUserInfo({
      userName: data.user_name,
      userJob: data.user_about,
    });
  },
});
editPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const addPopupSelector = ".popup_type_add-card";

const addPopup = new PopupWithForm({
  popupSelector: addPopupSelector,
  formSubmit: (data) => {
    const card = new Card(
      {
        data,
        handleCardClick: () => {
          imagePopup.open(data.link, data.name);
        },
      },
      ".element__card-template"
    );
    list.prepend(card.generateCard());
  },
});
addPopup.setEventListeners();

const defaultConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__user-input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormValidator = new FormValidator(
  defaultConfig,
  document.querySelector(editPopupSelector)
);
const addFormValidator = new FormValidator(
  defaultConfig,
  document.querySelector(addPopupSelector)
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const editButton = document.querySelector(".profile__edit-button");

const addCardPopupButton = document.querySelector(".profile__add-button");

// const closeButton = document.querySelector(".popup__close-button");

addCardPopupButton.addEventListener("click", () => {
  addPopup.open();
});

editButton.addEventListener("click", () => {
  editPopup.open();
});

// closeButton.addEventListener("click",() =>{

// })

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

const renderCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        imagePopup.open(data.link, data.name);
      },
    },
    ".element__card-template"
  );
  list.prepend(card.generateCard());
};

initialCards.forEach((data) => {
  renderCard(data);
});
