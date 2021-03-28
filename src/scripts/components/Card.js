class Card {
  constructor({data, templateSelector, handleCardClick, handleRemoveButton, makeLikeRequest, currentUserId}) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._likes = Array.from(data.likes);

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveButton = handleRemoveButton;
    this._makeLikeRequest = makeLikeRequest;
    this._currentUserId = currentUserId;
    
    this._handleCardLike = this._handleCardLike.bind(this);
  }
  
  create() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.card__title');
    this._image = this._element.querySelector('.card__image');
    this._like = this._element.querySelector('.card__like');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._removeButton = this._element.querySelector('.card__remove');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    if (this.isLiked()) {
      this._like.classList.add('card__like_active');
    }

    if (this._ownerId !== this._currentUserId) {
      this._deleteRemoveButton();
    }

    this._setEventListeners();

    return this._element;
  }

  delete() {
    this._element.remove();
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some(user => user._id === this._currentUserId);
  }

  _handleCardLike() {
    this._makeLikeRequest(this)
      .then((card) => {
        this._likes = card.likes;
        this._likeCounter.textContent = this._likes.length;
        if (this.isLiked()) {
          this._like.classList.add('card__like_active');
        } else {
          this._like.classList.remove('card__like_active');
        }
      });
  }

  _deleteRemoveButton() {
    this._removeButton.remove();
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link
    }));
    this._like.addEventListener('click', this._handleCardLike.bind(this));
    this._removeButton.addEventListener('click', () => this._handleRemoveButton(this));
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