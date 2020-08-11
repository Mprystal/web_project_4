const imagePopup = document.querySelector(".popup_type_image");
const imageFigImg = document.querySelector(".popup__figimg");
const imageFigCap = document.querySelector(".popup__figcap");

const closePopup = (popupT) => {
  popupT.classList.remove("popup_opened");
};

const handleEscape = (e) => {
  if (e.key === "Escape") {
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

class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card");

    return cardTemplate;
  }

  _handleLikeIcon(e) {
    e.target.classList.toggle("element__card-heart_active");
  }

  _handleRemoveCard(e) {
    e.target.closest(".element__card").remove();
  }

  _handleImagePreview() {
    togglePopup(imagePopup);
    console.log(data);

    imageFigImg.src = `${this._link}`;
    imageFigImg.alt = `Picture of ${this._name}`;

    imageFigCap.textContent = `${this._name}`;
  }

  _setEventListeners() {
    const cardImage = this._card.querySelector(".element__card-img");
    const cardLikeButton = this._card.querySelector(".element__card-heart");
    const cardRemoveButton = this._card.querySelector(".element__card-remove");

    cardRemoveButton.addEventListener("click", this._handleRemoveCard);

    cardLikeButton.addEventListener("click", this._handleLikeIcon);

    cardImage.addEventListener("click", this._handleImagePreview);
  }

  generateCard() {
    this._card = this._getCardTemplate().cloneNode(true);
    const cardTitle = this._card.querySelector(".element__card-heading");
    const cardImage = this._card.querySelector(".element__card-img");

    cardTitle.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;

    this._setEventListeners();

    return this._card;
  }
}

export default Card;
