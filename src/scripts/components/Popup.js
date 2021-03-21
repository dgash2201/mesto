export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('click', this._handleOverlayClick);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._handleOverlayClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') this.close();
  }

  _handleOverlayClick(event) {
    if(event.target.classList.contains('popup')) this.close();
  }
}