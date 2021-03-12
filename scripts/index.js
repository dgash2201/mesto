import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const page = document.querySelector('.page');
const cardsList = page.querySelector('.cards__list');

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

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const profileFormValidator = new FormValidator(settings, profileForm);
const cardFormValidator = new FormValidator(settings, cardForm);
const templateSelector = '#card-template';


function handleEscape(event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains('popup')) closePopup(event.target);
}

function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

function hideInputError(form, inputElement, inputErrorClass) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

function prepareInputs(form, inputList, inputErrorClass) {
  inputList.forEach((inputElement) => hideInputError(form, inputElement, inputErrorClass));
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

function handlePreviewPicture(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(imagePopup);
}

function handleAddCardForm(event) {
  event.preventDefault();

  const card = new Card({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }, templateSelector, handlePreviewPicture);

  cardsList.prepend(card.create());

  closePopup(cardPopup);
}

function handleAddButton(event) {
  cardForm.reset();
  prepareInputs(cardForm, [cardNameInput, cardLinkInput], 'popup__input_type_error');
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

initialCards.forEach((cardData) => {
  const card = new Card(cardData, templateSelector, handlePreviewPicture);
  cardsList.prepend(card.create());
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();