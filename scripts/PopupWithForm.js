import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputs = this._popupElement.querySelectorAll(".popup__user-input");
    this._formValues = {};
    this._inputs.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  getCardId (cardId) {
    return cardId
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this._formSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    const formSelector = this._popupElement.querySelector("form");
    formSelector.reset();

    super.close();
  }
}

export default PopupWithForm;
