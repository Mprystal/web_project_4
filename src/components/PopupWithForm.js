import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmit, buttonSelector  }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._buttonSelector = buttonSelector;
  }

  _getInputValues() {
    this._inputs = this._popupElement.querySelectorAll(".popup__user-input");
    this._formValues = {};
    this._inputs.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    
    return this._formValues;
  }

  setDelete(cardDelete){
    this._delete = cardDelete;
  }

  runDelete(){
    this._delete()
  }

  setSubmitAction(action) {
    this._formSubmit = action;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
  
      this._formSubmit(this._getInputValues());
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
