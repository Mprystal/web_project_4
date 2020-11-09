import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor( popupSelector,imageSelector,captionSelector){
    super(popupSelector)
    this._popupImage = this._popupElement.querySelector(imageSelector)
    this._popupCaption = this._popupElement.querySelector(captionSelector)
  }

  open(link, caption) {
    this._popupImage.src = link;
    this._popupCaption.textContent = caption;
    super.open();
  }
}

export default PopupWithImage;
