import {Card} from "./Card.js"
import {FormValidator} from "./FormValidator.js"

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

// Объявление функций

// Функция открытия попапа
export const openPopup = (popup) => {
  document.addEventListener('keydown', closeEscapeKey);
  popup.classList.add('popup_opened');
}

// Обертки для функций открытия
const openPopupEditProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

// Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscapeKey);
}

// Функция закрытия попапа по нажатию escape
const closeEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Функции обработки форм
// Отправка формы редактирования профиля
const handleFormEditProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// Отправка формы добавления карточки
const handleFormAddCardSubmit = (evt) => {
  evt.preventDefault();
  const card = {};
  card.name = placeInput.value;
  card.link = srcInput.value;
  addCard(card);
  formAddCard.reset();
  closePopup(popupAddCard);
}

// Добавление сгенерированного элемента карточки на страницу
const addCard = (data) => {
  const card = new Card(data, '#card');
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
}

// Установка слушателей
// Слушатели открытия попапа
buttonOpenPopupEditProfile.addEventListener('click', openPopupEditProfile);
buttonOpenPopupAddCard.addEventListener('click', () => openPopup(popupAddCard))

// Слушатели закрытия попапов по клику на оверлей или крестик
popupList.forEach((popup) => {
  popup.querySelector('.popup__wrapper').addEventListener('mousedown', (evt) => evt.stopPropagation());
  popup.addEventListener('mousedown', () => closePopup(popup));
  popup.querySelector('.button_type_close').addEventListener('mousedown', () => closePopup(popup));
});

// Слушатели отправки формы
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);




// Динамическое добавление карточек через JS
initialCards.forEach(addCard);

// создание для каждой формы экземпляра класса FormValidator и включение валидации
const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
  });