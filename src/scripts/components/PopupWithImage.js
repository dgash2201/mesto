import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(imageData) {
    const image = this._popup.querySelector('.popup__image');
    const caption = this._popup.querySelector('.popup__caption');
    image.src = imageData.link;
    image.alt = imageData.name;
    caption.textContent = imageData.name;
    super.open();
  }
}