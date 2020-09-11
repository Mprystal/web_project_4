class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _handleRemoveCard = () => {
    this._card.remove();
    this._card = null;
  };

  _setEventListeners() {
    this._card
      .querySelector(".element__card-remove")
      .addEventListener("click", this._handleRemoveCard);

    this._card
      .querySelector(".element__card-heart")
      .addEventListener("click", this._handleLikeIcon);

    this._card
      .querySelector(".element__card-img")
      .addEventListener("click", () => this._handleCardClick());
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
