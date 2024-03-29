import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import './index.css';
import { Api } from '../scripts/components/Api.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '61dd454c-d1c5-452b-8062-22ed0eb542c2',
    'Content-Type': 'application/json'
  }
});

const initialPromises = [api.getUserInfo(), api.getInitialCards()];

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  statusSelector: '.profile__status',
  avatarSelector: '.profile__avatar'
});

const cardPopup = new PopupWithForm('.popup_type_new-card', handleCardForm);
const profilePopup = new PopupWithForm('.popup_type_edit-profile', handleProfileForm);
const avatarPopup = new PopupWithForm('.popup_type_edit-avatar', handleAvatarForm);
const imagePopup = new PopupWithImage('.popup_type_image');
const confirmPopup = new PopupWithConfirm('.popup_type_confirm');

const cardPopupForm = cardPopup.getFormElement();
const profilePopupForm = profilePopup.getFormElement();
const avatarPopupForm = avatarPopup.getFormElement();

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__overlay');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardFormValidator = new FormValidator(settings, cardPopupForm);
const profileFormValidator = new FormValidator(settings, profilePopupForm);
const avatarFormValidator = new FormValidator(settings, avatarPopupForm);

const templateSelector = '#card-template';
const profileNameInput = profilePopupForm.querySelector('.popup__input_type_name');
const profileStatusInput = profilePopupForm.querySelector('.popup__input_type_status');

const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addInitialItem(cardElement);
  }, 
}, '.cards__list');



function handleError(err) {
  console.log(err);
}

function handleCardClick(cardData) {
  imagePopup.open(cardData);
}

function handleRemoveButton(card) {
  confirmPopup.open(() => {
    api.deleteCard(card.getId())
      .then(() => {
        confirmPopup.close();
        card.delete();
      })
      .catch(handleError);   
  });
}

function makeLikeRequest(card) {
  const id = card.getId();
  if (!card.isLiked()) {
    return api.addCardLike(id);
  } 

  return api.deleteCardLike(id);
}

function createCard(cardData) {
  const myId = userInfo.getUserId();
  return new Card({
    data: cardData, 
    templateSelector: templateSelector, 
    handleCardClick: handleCardClick, 
    handleRemoveButton: handleRemoveButton, 
    makeLikeRequest: makeLikeRequest, 
    currentUserId: myId
  }).create();
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

function handleCardForm(event, formValues, saveButton) {
  event.preventDefault();
  renderLoading(true, saveButton);
  api.addCard(formValues)
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardsList.addItem(cardElement);
      cardPopup.close();
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(false, saveButton);
    })
}

function handleProfileForm(event, userData, saveButton) {
  event.preventDefault();
  renderLoading(true, saveButton);
  api.editUserInfo({
    name: userData.username,
    about: userData.status,
  })
    .then(responseData => {
      userInfo.setUserInfo(responseData);
      profilePopup.close();
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(false, saveButton);
    })
}

function handleAvatarForm(event, {link}, saveButton) {
  event.preventDefault();
  renderLoading(true, saveButton);
  api.editUserAvatar(link)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarPopup.close();
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(false, saveButton);
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

function handleAvatarPopupOpening() {
  prepareForm(avatarFormValidator);
  avatarPopup.open();
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
profileAvatar.addEventListener('click', handleAvatarPopupOpening);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

cardPopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();

Promise.all(initialPromises)
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  })
  .catch(handleError);

