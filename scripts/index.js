import {Card} from "./Card.js"
import {FormValidator} from "./FormValidator.js"
import {buttonOpenPopupEditProfile, buttonOpenPopupAddCard, popupEditProfile, popupAddCard, popupList, profileName, profileJob, formEditProfile, nameInput, jobInput, formAddCard, placeInput, srcInput, cardList, settings, initialCards} from "./constants.js"

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