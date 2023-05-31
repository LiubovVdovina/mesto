import './index.css';

// import { getUserInfo } from '../scripts/components/Api';

import {formEditProfile, formAddCard, settings, imagePopupSelector, buttonOpenPopupAddCard, buttonOpenPopupEditProfile, cardListSelector, popupAddCardSelector, popupEditProfileSelector, profileNameSelector, profileJobSelector, profileAvatarSelector} from "../scripts/utils/constants.js"

import {Card} from "../scripts/components/Card.js"
import {FormValidator} from "../scripts/components/FormValidator.js"

import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '8a0eefc6-3d0c-44b4-be01-a96205454bf1',
    'Content-Type': 'application/json'
  }
})
let curUserId;

api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo({ name: res.name, job: res.about, id: res._id });   // Получение полей имени и профессии от сервера
    curUserId = res._id;
  })


  //Динамическая генерация начальных карточек
api.getInitialCards()
  .then(res => res.reverse().forEach((item) => cardList.addItem(createCard(item))));

// Вспомогательная функция генерации элемента карточки
const createCard = (data) => {
  const cardElement = new Card({
    data: data, 
    templateSelector: '#card', 
    curUserId : curUserId,
    handleCardClick: (name, link) => imagePopup.open({ name, link })
  });
  return cardElement.generateCard();
};

// Создание экземпляров классов секция, карточка и все виды попапов

const userInfo = new UserInfo(profileNameSelector, profileJobSelector, profileAvatarSelector);
const cardList = new Section({ items: [], renderer: (item) => {
  cardList.addItem(createCard(item));
}}, cardListSelector);

const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector });

const popupEditProfile = new PopupWithForm({ 
  popupSelector: popupEditProfileSelector, 
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    api.sendUserInfo(data); //отправляем обновленные данные на сервер
  }
});

const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector, 
  handleFormSubmit: (data) => {
    const cardData = {
      name: data.place,
      link: data.src,
      owner: {
        _id: curUserId
      }
      
    };
    cardList.addItem(createCard(cardData));
    api.sendCardInfo(cardData);
  }
});

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