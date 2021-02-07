function showInputError(form, inputElement, inputErrorClass, errorMessage) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(form, inputElement, inputErrorClass) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

function checkInputValidity(form, inputElement, inputErrorClass) {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputErrorClass, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement, inputErrorClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  } 
};

function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(form, inputElement, settings.inputErrorClass);
      toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    });
  });
};

function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);

  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

enableValidation( {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
