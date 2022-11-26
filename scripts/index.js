// кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector('.button_type_edit');
const buttonOpenPopupAddCard = document.querySelector('.button_type_add');

// элементы попапов
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

// кнопки закрытия попапов
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.button_type_close');
const buttonClosePopupAddCard = popupAddCard.querySelector('.button_type_close');
const buttonClosePopupImg = popupImg.querySelector('.button_type_close');

// элементы, необходимые для обработки форм
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formEditProfile = popupEditProfile.querySelector('.input');
const nameInput = popupEditProfile.querySelector('.input__text_type_name');
const jobInput = popupEditProfile.querySelector('.input__text_type_job');

const formAddCard = popupAddCard.querySelector('.input');
const placeInput = popupAddCard.querySelector('.input__text_type_place');
const srcInput = popupAddCard.querySelector('.input__text_type_src');

const imagePopupElement = popupImg.querySelector('.popup__img');
const captionPopupElement = popupImg.querySelector('.popup__caption');

const cardList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;

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
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Обертки для функций открытия
function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopupImg(evt) {
  openPopup(popupImg);
  imagePopupElement.src = evt.target.src;
  imagePopupElement.alt = evt.target.alt;
  captionPopupElement.textContent = evt.target.parentElement.querySelector('.card__caption').textContent;
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функции обработки форм
// Отправка формы редактирования профиля
function formEditProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// Отправка формы добавления карточки
function formAddCardSubmitHandler (evt) {
  evt.preventDefault();
  const card = {};
  card.name = placeInput.value;
  card.link = srcInput.value;
  addCard(card);
  formAddCard.reset();
  closePopup(popupAddCard);
}

// Вспомогательные функции

// Создание элемента карточки из данных
function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImgElement = cardElement.querySelector('.card__img');
  cardImgElement.src = card.link;
  cardImgElement.alt = card.name;
  cardImgElement.addEventListener('click', openPopupImg);
  cardElement.querySelector('.card__caption').textContent = card.name;
  cardElement.querySelector('.card__like').addEventListener('click', clickLike);
  cardElement.querySelector('.button_type_remove').addEventListener('click', removeCard);
  return cardElement;
}

// Добавление элемента карточки на страницу
function addCard(card) {
  const cardElement = createCard(card);
  cardList.prepend(cardElement);
}

// окрашивание лайка при нажатии
function clickLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

// удаление карточки при нажатии на корзину
function removeCard(evt) {
  evt.target.parentElement.remove();
}

// Динамическое добавление карточек через JS
initialCards.forEach(addCard);

// Установка слушателей
// Слушатели открытия попапа
buttonOpenPopupEditProfile.addEventListener('click', openPopupEditProfile);
buttonOpenPopupAddCard.addEventListener('click', () => openPopup(popupAddCard))

// Слушатели закрытия попапа
buttonClosePopupEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonClosePopupAddCard.addEventListener('click', () => closePopup(popupAddCard));
buttonClosePopupImg.addEventListener('click', () => closePopup(popupImg));

// Слушатели отправки формы
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);