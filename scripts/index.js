// кнопки открытия попапов
const buttonEdit = document.querySelector('.button_type_edit');
const buttonAdd = document.querySelector('.button_type_add');

// элементы попапов
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img');

// кнопки закрытия попапов
const buttonCloseEdit = popupEdit.querySelector('.button_type_close');
const buttonCloseAdd = popupAdd.querySelector('.button_type_close');
const buttonCloseImg = popupImg.querySelector('.button_type_close');

// элементы, необходимые для обработки форм
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formEdit = popupEdit.querySelector('.input');
const nameInput = popupEdit.querySelector('.input__text_type_name');
const jobInput = popupEdit.querySelector('.input__text_type_job');

const formAdd = popupAdd.querySelector('.input');
const placeInput = popupAdd.querySelector('.input__text_type_place');
const srcInput = popupAdd.querySelector('.input__text_type_src');

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
function openPopupEdit() {
  openPopup(popupEdit);
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
function formEditSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Отправка формы добавления карточки
function formAddSubmitHandler (evt) {
  evt.preventDefault();
  const card = {};
  card.name = placeInput.value;
  card.link = srcInput.value;
  addCard(card);
  formAdd.reset();
  closePopup(popupAdd);
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
  renderGallery();
}

//
function renderGallery() {
  if (cardList.childElementCount < 3) {
    const cards = cardList.querySelectorAll('.card');
    // cards.forEach((item) => item.classList.add('card_size_small'));
  }
}

// Динамическое добавление карточек через JS
initialCards.forEach(addCard);

// Установка слушателей
// Слушатели открытия попапа
buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', () => openPopup(popupAdd))

// Слушатели закрытия попапа
buttonCloseEdit.addEventListener('click', () => closePopup(popupEdit));
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));
buttonCloseImg.addEventListener('click', () => closePopup(popupImg));

// Слушатели отправки формы
formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);