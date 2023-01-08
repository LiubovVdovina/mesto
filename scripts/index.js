// кнопки открытия попапов
const buttonOpenPopupEditProfile = document.querySelector('.button_type_edit');
const buttonOpenPopupAddCard = document.querySelector('.button_type_add');

// элементы попапов
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');
const popupList = Array.from(document.querySelectorAll('.popup'));

// кнопки закрытия попапов
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.button_type_close');
const buttonClosePopupAddCard = popupAddCard.querySelector('.button_type_close');
const buttonClosePopupImg = popupImg.querySelector('.button_type_close');

// элементы, необходимые для обработки форм
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formEditProfile = popupEditProfile.querySelector('.form');
const nameInput = popupEditProfile.querySelector('.form__input_type_name');
const jobInput = popupEditProfile.querySelector('.form__input_type_job');

const formAddCard = popupAddCard.querySelector('.form');
const placeInput = popupAddCard.querySelector('.form__input_type_place');
const srcInput = popupAddCard.querySelector('.form__input_type_src');

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
const openPopup = (popup) => {
  document.addEventListener('keydown', closeEscapeKey);
  popup.classList.add('popup_opened', 'popup_smooth');
}

// Обертки для функций открытия
const openPopupEditProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

const openPopupImg = (evt) => {
  imagePopupElement.src = evt.target.src;
  imagePopupElement.alt = evt.target.alt;
  captionPopupElement.textContent = evt.target.closest('.card').querySelector('.card__caption').textContent;
  openPopup(popupImg);
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

// Создание элемента карточки из данных
const createCard = (card) => {
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
const addCard = (card) => {
  const cardElement = createCard(card);
  cardList.prepend(cardElement);
}

// окрашивание лайка при нажатии
const clickLike = (evt) => {
  evt.target.classList.toggle('card__like_active');
}

// удаление карточки при нажатии на корзину
const removeCard = (evt) => {
  evt.target.closest('.card').remove();
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

// Слушатели закрытия попапов по клику на оверлей
popupList.forEach((popup) => {
  popup.querySelector('.popup__wrapper').addEventListener('click', (evt) => evt.stopPropagation());
  popup.addEventListener('click', () => closePopup(popup));
});

// Слушатели отправки формы
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);

