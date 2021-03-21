import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormValues) {
    super(popupSelector);
    this._handleFormValues = handleFormValues;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  getFormElement() {
    return this._form;
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    this._handleFormValues(this._getInputValues());
    this.close();
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll('input');
    const values = {};

    inputs.forEach(input => values[input.name] = input.value);

    return values;
  }
}