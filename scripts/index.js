const page = document.querySelector('.page');

const template = page.querySelector('#card-template').content;
const cardsList = page.querySelector('.cards__list');
const popups = page.querySelectorAll('.popup');

const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileStatus = page.querySelector('.profile__status');

const imagePopup = page.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const cardPopup = page.querySelector('.popup_type_new-card');
const cardForm = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_link');
const cardSaveButton = cardPopup.querySelector('.popup__save-button');

const profilePopup = page.querySelector('.popup_type_edit-profile');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileStatusInput = profilePopup.querySelector('.popup__input_type_status');
const profileSaveButton = profilePopup.querySelector('.popup__save-button');

function handleEscape(event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

function prepareInputs(form, inputList, inputErrorClass) {
  inputList.forEach((inputElement) => hideInputError(form, inputElement, inputErrorClass));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  page.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', handleEscape);
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
  
  prepareInputs(profileForm, [profileNameInput, profileStatusInput], 'popup__input_type_error');
  disableButton(profileSaveButton, 'popup__save-button_inactive');
  openPopup(profilePopup);
};

function handleAddCardForm(event) {
  event.preventDefault();

  renderCard(cardsList, createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }));

  closePopup(cardPopup);
}

function handleAddButton(event) {
  cardNameInput.value = '';
  cardLinkInput.value = '';

  prepareInputs(cardForm, [cardNameInput, cardLinkInput], 'popup');
  disableButton(cardSaveButton, 'popup__save-button_inactive');
  openPopup(cardPopup);
};

profileAddButton.addEventListener('click', handleAddButton);
profileEditButton.addEventListener('click', handleEditButton);

imagePopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(imagePopup));

profilePopup.addEventListener('submit', handleProfileEditForm);
profilePopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(profilePopup));

cardPopup.addEventListener('submit', handleAddCardForm);
cardPopup.querySelector('.popup__close-button').addEventListener('click', () => closePopup(cardPopup));

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) closePopup(popup);
  });
});

initialCards.forEach((cardData) => {
  renderCard(cardsList, createCard(cardData));
});

