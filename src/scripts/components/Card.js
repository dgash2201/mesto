class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  
  create() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.card__title');
    this._image = this._element.querySelector('.card__image');
    this._like = this._element.querySelector('.card__like');
    this._removeButton = this._element.querySelector('.card__remove');

    this._setEventListeners();
      
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    return this._element;
  }

  _handleCardLike(event) {
    event.target.classList.toggle('card__like_active');
  }
  
  _handleCardRemove(event) {
    event.target.closest('.card').remove();
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link
    }));
    this._like.addEventListener('click', this._handleCardLike);
    this._removeButton.addEventListener('click', this._handleCardRemove);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }  
}

export default Card;