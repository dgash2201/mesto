import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._imageCaption = this._popup.querySelector('.popup__caption');
  }

  open(imageData) {
    this._popupImage.src = imageData.link;
    this._popupImage.alt = imageData.name;
    this._imageCaption.textContent = imageData.name;
    super.open();
  }
}