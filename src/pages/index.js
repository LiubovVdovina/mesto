import './index.css';

import {formEditProfile, formAddCard, settings, imagePopupSelector, buttonOpenPopupAddCard, buttonOpenPopupEditProfile, initialCards, cardListSelector, popupAddCardSelector, popupEditProfileSelector, profileNameSelector, profileJobSelector} from "../scripts/utils/constants.js"

import {Card} from "../scripts/components/Card.js"
import {FormValidator} from "../scripts/components/FormValidator.js"

import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

// Вспомогательная функция генерации элемента карточки
const createCard = (data) => {
  const cardElement = new Card({
    data: data, 
    templateSelector: '#card', 
    handleCardClick: (name, link) => imagePopup.open({ name, link })
  });
  return cardElement.generateCard();
};

// Создание экземпляров классов секция, карточка и все виды попапов

const userInfo = new UserInfo(profileNameSelector, profileJobSelector);
const cardList = new Section({ items: initialCards.reverse(), renderer: (item) => {
  cardList.addItem(createCard(item));
}}, cardListSelector);

const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector });

const popupEditProfile = new PopupWithForm({ 
  popupSelector: popupEditProfileSelector, 
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  }
});

const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector, 
  handleFormSubmit: (data) => {
    const cardData = {
      name: data.place,
      link: data.src,
    };
    cardList.addItem(createCard(cardData))
    popupAddCard.close();
  }
});

//Динамическая генерация начальных карточек
cardList.renderItems();

// Установка слушателей
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
imagePopup.setEventListeners();


// Слушатели открытия попапов
buttonOpenPopupEditProfile.addEventListener('click', () => {
  const currUserInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues(currUserInfo);
  popupEditProfile.open();
});

buttonOpenPopupAddCard.addEventListener('click', popupAddCard.open.bind(popupAddCard))

// создание для каждой формы экземпляра класса FormValidator и включение валидации
  const formEditProfileValidator = new FormValidator(settings, formEditProfile);
  formEditProfileValidator.enableValidation();

  const formAddCardValidator = new FormValidator(settings, formAddCard);
  formAddCardValidator.enableValidation();