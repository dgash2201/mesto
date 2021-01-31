const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit-button');
const profileAddButton = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileStatus = page.querySelector('.profile__status');

const cardsList = page.querySelector('.cards__list');

let popup;
let popupCloseButton;

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

function handleCardLike(event) {
  event.target.classList.toggle('card__like_active');
}

function handleCardRemove(event) {
  event.target.closest('.card').remove();
}

function handleImageClick(event) {
  console.log('jfjfjf')
  popup = page.querySelector('.popup_type_image');
  popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', toggleOpenedPopup);

  const popupImage = popup.querySelector('.popup__image');
  const image = event.target;
  popupImage.src = image.src;
  popupImage.alt = image.alt;

  const popupCaption = popup.querySelector('.popup__caption');
  popupCaption.textContent = popupImage.alt;
  toggleOpenedPopup();
}

function addCard(name, link) {
  const template = page.querySelector('#card-template').content;
  const card = template.cloneNode(true);

  const image = card.querySelector('.card__image');
  image.src = link;
  image.alt = name;
  image.addEventListener('click', handleImageClick);

  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__like').addEventListener('click', handleCardLike);
  card.querySelector('.card__remove').addEventListener('click', handleCardRemove);

  cardsList.prepend(card);
}

function toggleOpenedPopup() {
  popup.classList.toggle('popup_opened');
}

function handleProfileEditForm(event) {
  event.preventDefault();

  const popupNameInput = popup.querySelector('.popup__input_type_name');
  const popupStatusInput = popup.querySelector('.popup__input_type_status');

  profileName.textContent = popupNameInput.value;
  profileStatus.textContent = popupStatusInput.value;

  toggleOpenedPopup();
};

function handleEditButton() {
  popup = page.querySelector('.popup_type_edit-profile');
  popupCloseButton = popup.querySelector('.popup__close-button');
  popup.addEventListener('submit', handleProfileEditForm);
  popupCloseButton.addEventListener('click', toggleOpenedPopup);

  const popupNameInput = popup.querySelector('.popup__input_type_name');
  const popupStatusInput = popup.querySelector('.popup__input_type_status');

  popupNameInput.value = profileName.textContent;
  popupStatusInput.value = profileStatus.textContent;
  
  toggleOpenedPopup();
};

function handleAddCardForm(event) {
  event.preventDefault();

  const popupNameInput = popup.querySelector('.popup__input_type_name');
  const popupLinkInput = popup.querySelector('.popup__input_type_link');

  addCard(popupNameInput.value, popupLinkInput.value);

  toggleOpenedPopup();
}

function handleAddButton(event) {
  popup = page.querySelector('.popup_type_new-card');
  popupCloseButton = popup.querySelector('.popup__close-button');

  popup.addEventListener('submit', handleAddCardForm);
  popupCloseButton.addEventListener('click', toggleOpenedPopup);

  const popupNameInput = popup.querySelector('.popup__input_type_name');
  const popupLinkInput = popup.querySelector('.popup__input_type_link');

  popupNameInput.value = '';
  popupNameInput.style.placeholder = 'Название';
  popupLinkInput.value = '';
  popupLinkInput.style.placeholder = 'Ссылка на картинку';

  toggleOpenedPopup();
};

profileAddButton.addEventListener('click', handleAddButton);
profileEditButton.addEventListener('click', handleEditButton);

initialCards.forEach((card) => {
  addCard(card.name, card.link);
});
