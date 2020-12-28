let page = document.querySelector('.page');

let profileEditButton = page.querySelector('.profile__edit-button');
let profileName = page.querySelector('.profile__name');
let profileStatus = page.querySelector('.profile__status');

let popup = page.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupNameInput = popup.querySelector('.popup__input_type_name');
let popupStatusInput = popup.querySelector('.popup__input_type_status');

let toggleOpenedPopup = () => {
  popup.classList.toggle('popup_opened');
};

let handleEditButton = () => {
  popupNameInput.value = profileName.textContent;
  popupStatusInput.value = profileStatus.textContent;
  toggleOpenedPopup();
};

let handleFormSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileStatus.textContent = popupStatusInput.value;
  toggleOpenedPopup();
};

profileEditButton.addEventListener('click', handleEditButton);
popupCloseButton.addEventListener('click', toggleOpenedPopup);
popup.addEventListener('submit', handleFormSubmit);
