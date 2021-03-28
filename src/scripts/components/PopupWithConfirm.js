import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = document.querySelector('.popup__confirm-button');
  }

  open(handleDelete) {
    this._handleDelete = handleDelete;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleDelete();
    })
  }
}