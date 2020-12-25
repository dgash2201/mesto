let page = document.querySelector('.page');

let profileEditButton = page.querySelector('.profile__edit-button');
let profileName = page.querySelector('.profile__name');
let profileStatus = page.querySelector('.profile__status');

let popup = page.querySelector('.popup');
let popupCloseButton = page.querySelector('.popup__close-button');
let popupNameInput = page.querySelector('.popup__input_type_name');
let popupStatusInput = page.querySelector('.popup__input_type_status');
let popupSaveButton = page.querySelector('.popup__save-button');

let cardLikes = page.querySelectorAll('.card__like');

let toggleClass = (element, className) => {
  element.classList.toggle(className);
}

let toggleOpenedPopup = () => {
  toggleClass(popup, 'popup_opened');
};

let handleEditButton = () => {
  toggleOpenedPopup();
  popupNameInput.value = profileName.textContent;
  popupStatusInput.value = profileStatus.textContent;
};

let saveProfileData = () => {
  profileName.textContent = popupNameInput.value;
  profileStatus.textContent = popupStatusInput.value;
};

let handleFormSubmit = (event) => {
  event.preventDefault();
  toggleOpenedPopup();
  saveProfileData();
};

let handleEnter = (event) => {
  if (event.keyCode === 13 && popup.classList.contains('popup_opened')) {
    console.log('Yes');
    handleFormSubmit(event);
  }
};

profileEditButton.addEventListener('click', handleEditButton);
popupCloseButton.addEventListener('click', toggleOpenedPopup);
popupSaveButton.addEventListener('click', handleFormSubmit);
page.addEventListener('keydown', handleEnter);

cardLikes.forEach(element => {
  element.addEventListener('click', () => {
    toggleClass(element, 'card__like_active');
  });
});
