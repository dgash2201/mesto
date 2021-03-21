import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import initialCards from '../scripts/components/initial-cards.js';
import './index.css';



const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  statusSelector: '.profile__status',
});

const cardPopup = new PopupWithForm('.popup_type_new-card', handleCardForm);
const profilePopup = new PopupWithForm('.popup_type_edit-profile', handleProfileForm);
const imagePopup = new PopupWithImage('.popup_type_image');

const cardPopupForm = cardPopup.getFormElement();
const profilePopupForm = profilePopup.getFormElement();

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardFormValidator = new FormValidator(settings, cardPopupForm, profileAddButton);
const profileFormValidator = new FormValidator(settings, profilePopupForm, profileEditButton);

const templateSelector = '#card-template';
const profileNameInput = profilePopupForm.querySelector('.popup__input_type_name');
const profileStatusInput = profilePopupForm.querySelector('.popup__input_type_status');

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }, 
}, '.cards__list');

function handleCardClick(cardData) {
  imagePopup.open(cardData);
}

function createCard(cardData) {
  return new Card(cardData, templateSelector, handleCardClick).create();
}

function handleCardForm(cardData) {
  const cardElement = createCard(cardData);
  cardsList.addItem(cardElement);
}

function handleProfileForm(userData) {
  userInfo.setUserInfo({
    username: userData.username,
    status: userData.status,
  });
}

function prepareForm(formValidator) {
  formValidator.prepareInputs();
  formValidator.disableButton();
}

function handleCardPopupOpening() {
  prepareForm(cardFormValidator);
  cardPopup.open();
}

function handleProfilePopupOpening() {
  const userData = userInfo.getUserInfo();

  profileNameInput.value = userData.username;
  profileStatusInput.value = userData.status;

  prepareForm(profileFormValidator);
  profilePopup.open();
}

profileAddButton.addEventListener('click', handleCardPopupOpening);
profileEditButton.addEventListener('click', handleProfilePopupOpening);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

cardPopup.setEventListeners();
profilePopup.setEventListeners();
imagePopup.setEventListeners();

cardsList.renderItems();