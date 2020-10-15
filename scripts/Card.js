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
  }

  id() {
    return this._id;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card");

    if (this._owner !== this._currentUserId) {
      cardTemplate.children[0].classList.add("element__card-hidden");
    } else {
      cardTemplate.children[0].classList.remove("element__card-hidden");
    }

    return cardTemplate;
  }

  _handleLikeIcon(e) {
    e.target.classList.toggle("element__card-heart_active");
  }

  likedStatus = (e) =>{
    if( e.target.classList.contains("element__card-heart_active")){
      console.log(e);
    } else {
      console.log(e,"2");
    }
  }

  isLiked= () => {
    console.log("liked")
  }

  isNotLiked= () =>{
    console.log("notliked")
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
        this._handleLikes(this.id(),this.likedStatus)
      );

    this._card
      .querySelector(".element__card-img")
      .addEventListener("click", () => this._handleCardClick());
  }

  generateCard() {
    this._card = this._getCardTemplate().cloneNode(true);
    const cardTitle = this._card.querySelector(".element__card-heading");
    const cardImage = this._card.querySelector(".element__card-img");
    const cardLikes = this._card.querySelector(".element__card-likes");

    cardTitle.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;
    cardLikes.textContent = this._likes;

    this._setEventListeners();

    
    return this._card;
  }
}

export default Card;
