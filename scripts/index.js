import "../page/index.css";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import { data } from "autoprefixer";
import Api from "./Api.js";

const list = document.querySelector(".element");

const editPopupSelector = ".popup_type_edit-profile";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-4",
  headers: {
    authorization: "df5252cc-ce9a-49bc-822a-e9a6c67f648c",
    "Content-Type": "application/json",
  },
});

const typeName = document.querySelector(".profile__name");
const typeJob = document.querySelector(".profile__occupation");

const profileInfo = new UserInfo({
  name: typeName,
  job: typeJob,
});

api.getCardInfo().then((res) => {
  profileInfo.setUserInfo({ userName: res.name, userJob: res.about });
});

const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  formSubmit: (data) => {
    api
      .setUserInfo({
        name: data.user_name,
        about: data.user_about,
      })
      .then((res) => {
        profileInfo.setUserInfo({
          userName: data.user_name,
          userJob: data.user_about,
        });
      })
      .catch((err) => {
        console.log("error", err);
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
    api.addCard(data).then((res) => {
      const card = new Card(
        {
          data,
          handleCardClick: () => {
            imagePopup.open(data.link, data.name);
          },
          handleRemovingCard: (cardId) => {
            api
              .removeCard(cardId)
              .then(() => {
                console.log(res);
              })
              .then(() => {
                card.remove();
              })
              .catch((err) => {
                console.log("error", err);
              });
          },
        },
        ".element__card-template"
      );
      list.prepend(card.generateCard());
    });
  },
});
addPopup.setEventListeners();

api.getCardList().then((res) => {
  const renderCard = (data) => {
    const card = new Card(
      {
        data,
        handleCardClick: () => {
          imagePopup.open(data.link, data.name);
        },
        handleRemovingCard: (cardId) => {
          api
            .removeCard(cardId)
            .then(() => {
              console.log(cardId);
            })
            .then(() => {
              card.remove();
            })
            .catch((err) => {
              console.log("error", err);
            });
        },
      },
      ".element__card-template"
    );
    list.prepend(card.generateCard());
  };

  res.forEach((data) => {
    renderCard(data);
  });
});

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
