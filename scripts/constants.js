// константы для card.js

const popupImg = document.querySelector('.popup_type_img');
const imagePopupElement = popupImg.querySelector('.popup__img');
const captionPopupElement = popupImg.querySelector('.popup__caption');

// константы для index.js

// кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector('.button_type_edit');
const buttonOpenPopupAddCard = document.querySelector('.button_type_add');

// элементы попапов
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupList = Array.from(document.querySelectorAll('.popup'));

// элементы, необходимые для обработки форм
const profileName = document.querySelector('.profile__name'); 
const profileJob = document.querySelector('.profile__job');

const formEditProfile = document.forms["edit-form"];
const nameInput = popupEditProfile.querySelector('.form__input_type_name');
const jobInput = popupEditProfile.querySelector('.form__input_type_job');

const formAddCard = document.forms["place-form"];
const placeInput = popupAddCard.querySelector('.form__input_type_place');
const srcInput = popupAddCard.querySelector('.form__input_type_src');

// Элемент галлереи карточек
const cardList = document.querySelector('.gallery__list');

// Настройки валидации
const settings = { 
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input-error_active'
}

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

export {popupImg, imagePopupElement, captionPopupElement}
export {buttonOpenPopupEditProfile, buttonOpenPopupAddCard, popupEditProfile, popupAddCard, popupList, profileName, profileJob, formEditProfile, nameInput, jobInput, formAddCard, placeInput, srcInput, cardList, settings, initialCards}