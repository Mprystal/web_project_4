function showErrorMessage(
  input,
  form,
  { errorClass, inputErrorClass, underlineClass, ...rest }
) {
  const error = document.querySelector(`#${input.id}-error`);

  error.textContent = input.validationMessage;

  error.classList.add(errorClass);
  input.classList.add(inputErrorClass);
  input.closest("li").classList.add(underlineClass);
}

function hideErrorMessage(
  input,
  form,
  { errorClass, inputErrorClass, underlineClass, ...rest }
) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = "";

  error.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
  input.closest("li").classList.remove(underlineClass);
}

function checkInputValidity(input, form, rest) {
  if (input.validity.valid) {
    hideErrorMessage(input, form, rest);
  } else {
    showErrorMessage(input, form, rest);
  }
}

function toggleButtonState(inputs, button, { inactiveButtonClass, ...rest }) {
  const isValid = inputs.every((input) => input.validity.valid);

  if (isValid) {
    button.classList.remove(inactiveButtonClass);
  } else {
    button.classList.add(inactiveButtonClass);
  }
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  ...rest
}) {
  const forms = [...document.querySelectorAll(formSelector)];
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDeafult();
    });
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, form, rest);
        toggleButtonState(inputs, button, rest);
      });
    });
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__user-input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  underlineClass: "popup__user-list_underlined",
});
