const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileStatus = page.querySelector('.profile__status');

const template = page.querySelector('#card-template').content;
const cardsList = page.querySelector('.cards__list');

const imagePopup = page.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const cardPopup = page.querySelector('.popup_type_new-card');
const cardNameInput = cardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_link');

const profilePopup = page.querySelector('.popup_type_edit-profile');
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileStatusInput = profilePopup.querySelector('.popup__input_type_status');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleCardLike(event) {
  event.target.classList.toggle('card__like_active');
}

function handleCardRemove(event) {
  event.target.closest('.card').remove();
}

function handlePrewiewPicture(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(imagePopup);
}

function createCard(cardData) {
  const card = template.cloneNode(true);
  const title = card.querySelector('.card__title');
  const image = card.querySelector('.card__image');
  const like = card.querySelector('.card__like');
  const remove = card.querySelector('.card__remove');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  image.addEventListener('click', () => handlePrewiewPicture(cardData));
  like.addEventListener('click', handleCardLike);
  remove.addEventListener('click', handleCardRemove);

  return card;
}

function renderCard(container, card) {
  container.prepend(card);
}

function handleProfileEditForm(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileStatus.textContent = profileStatusInput.value;

  closePopup(profilePopup);
};

function handleEditButton() {
  profileNameInput.value = profileName.textContent;
  profileStatusInput.value = profileStatus.textContent;
  
  openPopup(profilePopup);
};

function handleAddCardForm(event) {
  event.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  renderCard(cardsList, createCard(cardData));
  closePopup(cardPopup);
}

function handleAddButton(event) {
  cardNameInput.value = '';
  cardLinkInput.value = '';

  openPopup(cardPopup);
};

profileAddButton.addEventListener('click', handleAddButton);
profileEditButton.addEventListener('click', handleEditButton);

imagePopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(imagePopup));

profilePopup.addEventListener('submit', handleProfileEditForm);
profilePopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(profilePopup));

cardPopup.addEventListener('submit', handleAddCardForm);
cardPopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(cardPopup));

initialCards.forEach((cardData) => {
  renderCard(cardsList, createCard(cardData));
});
