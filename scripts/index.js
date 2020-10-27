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
const profileAvatar = document.querySelector(".profile__img")


const profileInfo = new UserInfo({
  name: typeName,
  job: typeJob,
  avatar: profileAvatar
});

Promise.all([api.getUserInfo(), api.getCardList()]).then(
  ([userInfo, cardListData]) => {
    // ... all code for displaying your application goes here and will only be executed after successful request for userInfo and cardList
    const addPopupSelector = ".popup_type_add-card";
    const profileImgSelector = ".popup_type_profile-img"
   
    profileInfo.setUserInfo({
      userName: userInfo.name,
      userJob: userInfo.about,
      userAvatar: userInfo.avatar
    });
    console.log(userInfo.avatar)
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
              handleLikes: (cardId) => {
                
                if( card.cardLikeButton.classList.contains("element__card-heart_active")){
                  api
                  .changeLikeCardStatus(cardId, true).then((data)=>{
                    card.updateLiked(data.likes.length);
                  })
                  .then(() => {
                    card.cardLikeButton.classList.remove("element__card-heart_active")
                  })
                  .catch((err) => {
                    console.log("error", err);
                  });
                  
                } else {
                  api
                  .changeLikeCardStatus(cardId, false).then((data)=>{
                    card.updateLiked(data.likes.length);
                  })
                  .then(() => {
                    card.cardLikeButton.classList.add("element__card-heart_active")
                  })
                  .catch((err) => {
                    console.log("error", err);
                  });
                }
                
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
          .then(() => {
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
    const profileImgValidator = new FormValidator(
      defaultConfig,
      document.querySelector(profileImgSelector)
    );

    editFormValidator.enableValidation();
    addFormValidator.enableValidation();
    profileImgValidator.enableValidation();

    const editButton = document.querySelector(".profile__edit-button");

    editButton.addEventListener("click", () => {
      editPopup.open();
    });

    const profileImgButton = document.querySelector(".profile__img-form");
    profileImgButton.addEventListener("click", () => {
      profileImgPopup.open();
    });
    

    const profileImgPopup = new PopupWithForm({
      popupSelector: profileImgSelector,
      formSubmit: (data) => { 

        api.setUserAvatar({avatar: data.link}).then((res) => {
          profileAvatar.style.backgroundImage = "url('" + res.avatar + "')";
          profileAvatar.style.backgroundPosition = "center";
          console.log(res)
        })
        .then(() => {  
          profileInfo.setUserInfo({
            userAvatar: data.link
          });
        })
        .catch((err) => {
          console.log("error", err);
        });;
      },
    });
    profileImgPopup.setEventListeners();
  }
  
);
