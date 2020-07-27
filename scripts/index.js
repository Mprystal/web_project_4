const editButton = document.querySelector(".profile__edit-button");
const closedButton = document.querySelector(".popup__close-button");

const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const addCardPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image");

const editForm = document.querySelector(".popup__form");
const addForm = document.querySelector(".popup__add-form");

const nameInput = editForm.querySelector(".popup__user-input_type_name");
const aboutInput = editForm.querySelector(".popup__user-input_type_about");

const headingInput = addForm.querySelector(".popup__user-input_card-heading");
const imageUrlInput = addForm.querySelector(".popup__user-input_url");

const userName = document.querySelector(".profile__name");
const userAbout = document.querySelector(".profile__occupation");

const addCardPopupButton = document.querySelector(".profile__add-button");

const imageFigImg = document.querySelector(".popup__figimg");
const imageFigCap = document.querySelector(".popup__figcap");

const popupOpen = document.querySelector(".popup__opened");

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

const togglePopup = (popupT) => {
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
const cardTemplate = document
  .querySelector(".element__card-template")
  .content.querySelector(".element__card");

const createCard = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".element__card-heading");
  const cardImage = cardElement.querySelector(".element__card-img");
  const cardLikeButton = cardElement.querySelector(".element__card-heart");
  const cardRemoveButton = cardElement.querySelector(".element__card-remove");

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;

  cardRemoveButton.addEventListener("click", (e) => {
    e.target.closest(".element__card").remove();
  });

  cardLikeButton.addEventListener("click", (e) => {
    e.target.classList.toggle("element__card-heart_active");
  });

  cardImage.addEventListener("click", () => {
    // open image popup
    togglePopup(imagePopup);

    imageFigImg.src = `${data.link}`;
    imageFigImg.alt = `Picture of ${data.name}`;
    imageFigCap.textContent = `${data.name}`;
  });

  return cardElement;
};

const renderCard = (data) => {
  list.prepend(createCard(data));
};

initialCards.forEach((data) => {
  renderCard(data);
});

const closePopup = (popupT) => {
  popupT.classList.remove("popup_opened");
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup(addCardPopup);
    closePopup(editProfilePopup);
    closePopup(imagePopup);
  }
});

const popupOverlay = [...document.querySelectorAll(".popup")];

popupOverlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(addCardPopup);
      closePopup(editProfilePopup);
      closePopup(imagePopup);
    }
  });
});
