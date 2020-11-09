class Card {
  constructor(
    { data, handleCardClick, handleRemovingCard, handleLikes, currentUserId },
    templateSelector
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._id = data._id;
    this._owner = data.owner._id;
    this._handleRemovingCard = handleRemovingCard;
    this.data = data;
    this._currentUserId = currentUserId;
    this._handleLikes = handleLikes;
    this._card = this._getCardTemplate();
    this.cardLikeButton = this._card.querySelector(".element__card-heart");
    this._cardLikes = this._card.querySelector(".element__card-likes");
    
  }

  id() {
    return this._id;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card").cloneNode(true);

    const hideButton = cardTemplate.querySelector(".element__card-remove");

    if (this._owner !== this._currentUserId) {
      
      hideButton.classList.add("element__card-hidden");
    } else {
      hideButton.classList.remove("element__card-hidden");
    }
  
    return cardTemplate;
  }

  updateLiked= (num) => {
    this._cardLikes.textContent = num;
  }

  remove = () => {
    this._card.remove();
    this._card = null;
  };

  _setEventListeners() {
    this._card
      .querySelector(".element__card-remove")
      .addEventListener("click", () => this._handleRemovingCard(this.id()));

    this._card
      .querySelector(".element__card-heart")
      .addEventListener(
        "click", () =>
        this._handleLikes(this.id())
      );

    this._card
      .querySelector(".element__card-img")
      .addEventListener("click", () => this._handleCardClick());
  }

  generateCard() {
   
    const cardTitle = this._card.querySelector(".element__card-heading");
    const cardImage = this._card.querySelector(".element__card-img");
   

    cardTitle.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;
    this._cardLikes.textContent = this._likes;

    this._setEventListeners();

    
    return this._card;
  }
}

export default Card;
