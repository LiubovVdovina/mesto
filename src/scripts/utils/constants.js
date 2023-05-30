// Селектор попапа с изображением
const imagePopupSelector = '.popup_type_img';

// кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector('.button_type_edit');
const buttonOpenPopupAddCard = document.querySelector('.button_type_add');

// селекторы попапов
const popupEditProfileSelector = '.popup_type_edit';
const popupAddCardSelector = '.popup_type_add';

// Селекторы полей информации о пользователе
const profileNameSelector = '.profile__name'; 
const profileJobSelector = '.profile__job';
const profileAvatarSelector = '.profile__avatar';
// Элементы форм
const formEditProfile = document.forms["edit-form"];
const formAddCard = document.forms["place-form"];

// Элемент галлереи карточек
const cardListSelector = '.gallery__list';

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

export {imagePopupSelector}
export {popupAddCardSelector, buttonOpenPopupEditProfile, buttonOpenPopupAddCard, popupEditProfileSelector, profileNameSelector, profileJobSelector, profileAvatarSelector, formEditProfile, formAddCard, cardListSelector, settings, initialCards}