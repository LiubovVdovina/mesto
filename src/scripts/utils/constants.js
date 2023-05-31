// Селектор попапа с изображением
const imagePopupSelector = '.popup_type_img';

// кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector('.button_type_edit');
const buttonOpenPopupAddCard = document.querySelector('.button_type_add');

// селекторы попапов
const popupEditProfileSelector = '.popup_type_edit';
const popupAddCardSelector = '.popup_type_add';
const popupRemoveCardSelector = '.popup_type_remove';

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

export {imagePopupSelector}
export {popupAddCardSelector, popupRemoveCardSelector, buttonOpenPopupEditProfile, buttonOpenPopupAddCard, popupEditProfileSelector, profileNameSelector, profileJobSelector, profileAvatarSelector, formEditProfile, formAddCard, cardListSelector, settings}