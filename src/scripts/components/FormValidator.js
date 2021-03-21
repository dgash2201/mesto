class FormValidator {
  constructor(settings, form, formOpenButton) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
    this._formOpenButton = formOpenButton;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _activeButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }
  
  _prepareInputs(inputList) {
    inputList.forEach((inputElement) => this._hideInputError(inputElement));
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
  
    this._formOpenButton.addEventListener('click', () => {
      this._disableButton(buttonElement);
      this._prepareInputs(inputList);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid);
  };
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._activeButton(buttonElement);
    } 
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }
}

export default FormValidator;