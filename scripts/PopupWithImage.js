import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, caption) {
    this._popupElement.querySelector(".popup__figimg").src = link;
    this._popupElement.querySelector(".popup__figcap").textContent = caption;
    super.open();
  }
}

export default PopupWithImage;
