import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('input');
    this._saveButton = this._form.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => this._handleFormSubmit(event, this._getInputValues(), this._saveButton));
  }

  close() {
    super.close();
    this._form.reset();
  }

  getFormElement() {
    return this._form;
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => values[input.name] = input.value);

    return values;
  }
}