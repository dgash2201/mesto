import Card from './Card.js';
import FormValidator from './FormValidator.js';

const page = document.querySelector('.page');
const cardsList = page.querySelector('.cards__list');

const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileStatus = page.querySelector('.profile__status');

const imagePopup = page.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');

const cardPopup = page.querySelector('.popup_type_new-card');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const cardPopupNameInput = cardPopup.querySelector('.popup__input_type_name');
const cardPopupLinkInput = cardPopup.querySelector('.popup__input_type_link');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');

const profilePopup = page.querySelector('.popup_type_edit-profile');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupNameInput = profilePopup.querySelector('.popup__input_type_name');
const profilePopupStatusInput = profilePopup.querySelector('.popup__input_type_status');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const profileFormValidator = new FormValidator(settings, profilePopupForm, profileEditButton);
const cardFormValidator = new FormValidator(settings, cardPopupForm, profileAddButton);
const templateSelector = '#card-template';

function handleEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = page.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains('popup')) closePopup(event.target);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleOverlayClick);
  page.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleOverlayClick)
  page.removeEventListener('keydown', handleEscape);
}

function handleProfileEditForm(event) {
  event.preventDefault();
  profileName.textContent = profilePopupNameInput.value;
  profileStatus.textContent = profilePopupStatusInput.value;

  closePopup(profilePopup);
};

function handleEditButton() {
  profilePopupNameInput.value = profileName.textContent;
  profilePopupStatusInput.value = profileStatus.textContent;

  openPopup(profilePopup);
};

function handlePreviewPicture(cardData) {
  imagePopupPicture.src = cardData.link;
  imagePopupPicture.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;

  openPopup(imagePopup);
}

function createCard(cardData) {
  const card = new Card(cardData, templateSelector, handlePreviewPicture);
  cardsList.prepend(card.create());
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function handleAddCardForm(event) {
  event.preventDefault();

  createCard({
    name: cardPopupNameInput.value, 
    link: cardPopupLinkInput.value 
  });

  closePopup(cardPopup);
}

function handleAddButton() {
  cardPopupForm.reset();
  openPopup(cardPopup);
};

profileAddButton.addEventListener('click', handleAddButton);
profileEditButton.addEventListener('click', handleEditButton);

imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

profilePopup.addEventListener('submit', handleProfileEditForm);
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

cardPopup.addEventListener('submit', handleAddCardForm);
cardPopupCloseButton.addEventListener('click', () => closePopup(cardPopup));

initialCards.forEach((cardData) => {
  createCard(cardData);
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();