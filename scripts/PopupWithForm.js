import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit }) {
    debugger;
    this._formSubmit = formSubmit;
    super(popupSelector);
  }

  _getInputValues() {
    this._inputs = this._popupElement.querySelectorAll(".popup__user-input");
    this._formValues = {};
    this._inputs.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupElement.reset();
    super.close();
  }
}

export default PopupWithForm;
