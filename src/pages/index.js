import './index.css';

// import { getUserInfo } from '../scripts/components/Api';

import {formAvatar, buttonOpenAvatarPopup, popupAvatarSelector, formEditProfile, formAddCard, settings, imagePopupSelector, buttonOpenPopupAddCard, buttonOpenPopupEditProfile, cardListSelector, popupAddCardSelector, popupRemoveCardSelector, popupEditProfileSelector, profileNameSelector, profileJobSelector, profileAvatarSelector} from "../scripts/utils/constants.js"

import {Card} from "../scripts/components/Card.js"
import {FormValidator} from "../scripts/components/FormValidator.js"

import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js'

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
    userInfo.setUserInfo({ name: res.name, job: res.about, id: res._id, avatar: res.avatar });   // Получение полей имени и профессии от сервера
    curUserId = res._id;
  })


  //Динамическая генерация начальных карточек
api.getInitialCards()
  .then(res => res.reverse().forEach((item) => cardList.addItem(createCard(item))));

const handleRemoveCard = (card) => {
  popupRemoveCard.open(card);
}

// Вспомогательная функция генерации элемента карточки
const createCard = (data) => {
  const cardElement = new Card({
    data: data, 
    templateSelector: '#card', 
    curUserId : curUserId,
    handleCardClick: (name, link) => imagePopup.open({ name, link }),
    handleDelete: () => {
      handleRemoveCard(cardElement);
    },
    handleLike: () => {
      if(cardElement.isLiked()) {
        api.removeLike(cardElement.getId())
          .then((res) => {
            cardElement.countLikes(res.likes);
          })
      } else {
        api.putLike(cardElement.getId())
          .then((res) => {
            cardElement.countLikes(res.likes);
          })
      }
    }
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
    popupEditProfile.renderLoading(true);
    userInfo.setUserInfo(data);
    api.sendUserInfo(data) //отправляем обновленные данные на сервер
      .finally(popupEditProfile.renderLoading(false));
  }
});

const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector, 
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true);
    const cardData = {
      name: data.place,
      link: data.src,
      owner: {
        _id: curUserId
      }
      
    };
    api.sendCardInfo(cardData)
      .then(res => {
        cardList.addItem(createCard(res));
      })
      .finally(popupAddCard.renderLoading(false));
  }
});

const popupRemoveCard = new PopupWithConfirmation({ 
  popupSelector: popupRemoveCardSelector, 
  handleFormSubmit: (card) => {
    api.removeCard(card.getId())
    .then(() => {
      card.removeCard();
    });
  }
});

const popupAvatar = new PopupWithForm({ 
  popupSelector: popupAvatarSelector, 
  handleFormSubmit: (data) => {
    popupAvatar.renderLoading(true);
    api.sendAvatarInfo(data)
    .finally(popupAvatar.renderLoading(false));
    userInfo.setAvatar(data.src);
  }
});

// Установка слушателей
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupRemoveCard.setEventListeners();
popupAvatar.setEventListeners();
imagePopup.setEventListeners();


// Слушатели открытия попапов
buttonOpenPopupEditProfile.addEventListener('click', () => {
  const currUserInfo = userInfo.getUserInfo();
  popupEditProfile.setInputValues(currUserInfo);
  popupEditProfile.open();
});

buttonOpenPopupAddCard.addEventListener('click', popupAddCard.open.bind(popupAddCard));
buttonOpenAvatarPopup.addEventListener('click', popupAvatar.open.bind(popupAvatar));

// создание для каждой формы экземпляра класса FormValidator и включение валидации
  const formEditProfileValidator = new FormValidator(settings, formEditProfile);
  formEditProfileValidator.enableValidation();

  const formAddCardValidator = new FormValidator(settings, formAddCard);
  formAddCardValidator.enableValidation();

  const formAvatarValidator = new FormValidator(settings, formAvatar);
  formAvatarValidator.enableValidation();