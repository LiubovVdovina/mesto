const editButton = document.querySelector('.button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('.input');
const nameInput = editPopup.querySelectorAll('.input__text')[0];
const jobInput = editPopup.querySelectorAll('.input__text')[1];

const addButton = document.querySelector('.button_type_add');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('.input');
const placeInput = addPopup.querySelectorAll('.input__text')[0];
const srcInput = addPopup.querySelectorAll('.input__text')[1];

const imgPopup = document.querySelector('.popup_type_img');
const popupImg = imgPopup.querySelector('.popup__img');
const popupCaption = imgPopup.querySelector('.popup__caption');


// Поставить слушатели для закрытия модальных окон
const closeButtons = document.querySelectorAll('.button_type_close');
closeButtons.forEach(item => {
  item.addEventListener('click', closePopup);
});

// Функция закрытия попапа
function closePopup(evt) {
  const popupElement = evt.target.parentElement.parentElement;
  popupElement.classList.remove('popup_opened');
}

// Динамическое добавление карточек через JS

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

const cardList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;

function addCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').src = card.link;
  cardElement.querySelector('.card__img').alt = card.name;
  cardElement.querySelector('.card__img').addEventListener('click', openImgPopup);
  cardElement.querySelector('.card__caption').textContent = card.name;
  cardElement.querySelector('.card__like').addEventListener('click', clickLike);
  cardElement.querySelector('.button_type_remove').addEventListener('click', removeCard);
  cardList.prepend(cardElement);
}

initialCards.forEach(addCard);

//функции обработки и слушатели для открытия и обработки editPopup 

function openEditPopup() {
  editPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function editSubmitHandler (evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

editButton.addEventListener('click', openEditPopup);
editForm.addEventListener('submit', editSubmitHandler); 

//функции обработки и слушатели для открытия и обработки addPopup 

function openAddPopup() {
  addPopup.classList.add('popup_opened');
}

function addSubmitHandler (evt) {
  evt.preventDefault();
  const card = {};
  card.name = placeInput.value;
  card.link = srcInput.value;
  addCard(card);
  placeInput.value = '';
  srcInput.value = '';
  closePopup();
}

addButton.addEventListener('click', openAddPopup);
addForm.addEventListener('submit', addSubmitHandler); 

// открытие попапа картинки
function openImgPopup(evt) {
  imgPopup.classList.add('popup_opened');
  popupImg.src = evt.target.src;
  popupCaption.textContent = evt.target.parentElement.querySelector('.card__caption').textContent;
}

// окрашивание лайка при нажатии
function clickLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

// удаление карточки при нажатии на корзину
function removeCard(evt) {
  console.log(evt.target.parentElement);
  evt.target.parentElement.remove();
}