import "../page/index.css";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import { data } from "autoprefixer";
import Api from "./Api.js";
import Section from "./Section.js";

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

Promise.all([api.getUserInfo(), api.getCardList()]).then(
  ([userInfo, cardListData]) => {
    // ... all code for displaying your application goes here and will only be executed after successful request for userInfo and cardList
    const addPopupSelector = ".popup_type_add-card";
    profileInfo.setUserInfo({
      userName: userInfo.name,
      userJob: userInfo.about,
    });
    const cardList = new Section(
      {
        items: cardListData,
        renderer: (data) => {
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
              handleLikes: (cardId, isLiked) => {
                api
                  .changeLikeCardStatus(cardId, isLiked).then((data)=>{
                    card.isLiked(data);
                  })
                  .then(() => {
                    console.log(cardId, isLiked);
                  })
                  .catch((err) => {
                    console.log("error", err);
                  });
              },
              currentUserId: "7fb54333084f7cc9cdc452a8",
            },
            ".element__card-template"
          );

          cardList.appendItem(card.generateCard());
        },
      },
      ".element"
    );
    cardList.renderer();
    const addPopup = new PopupWithForm({
      popupSelector: addPopupSelector,
      formSubmit: (data) => {
        api.addCard(data).then((addCardData) => {
          const card = new Card(
            {
              data: addCardData,
              handleCardClick: () => {
                imagePopup.open(data.link, data.name);
              },
              handleRemovingCard: (cardId) => {
                api
                  .removeCard(cardId)

                  .then(() => {
                    card.remove();
                  })
                  .catch((err) => {
                    console.log("error", err);
                  });
              },
              currentUserId: "7fb54333084f7cc9cdc452a8",
            },
            ".element__card-template"
          );

          cardList.prependItem(card.generateCard());
        });
      },
    });

    addPopup.setEventListeners();
    const addCardPopupButton = document.querySelector(".profile__add-button");

    addCardPopupButton.addEventListener("click", () => {
      addPopup.open();
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

    editButton.addEventListener("click", () => {
      editPopup.open();
    });
  }
);
