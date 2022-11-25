const editButton = document.querySelector('.button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('.input');
const editClose = editPopup.querySelector('.button_type_close');
const nameInput = editPopup.querySelectorAll('.input__text')[0];
const jobInput = editPopup.querySelectorAll('.input__text')[1];


const addButton = document.querySelector('.button_type_add');
const addPopup = document.querySelector('.popup_type_add');
const addForm = addPopup.querySelector('.input');
const addClose = addPopup.querySelector('.button_type_close');
const placeInput = addPopup.querySelectorAll('.input__text')[0];
const srcInput = addPopup.querySelectorAll('.input__text')[1];

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
  cardElement.querySelector('.card__caption').textContent = card.name;
  cardList.prepend(cardElement);
}

initialCards.forEach(addCard);

//функции обработки и слушатели для открытия, закрытия и обработки editPopup 

function openEditPopup() {
  editPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}

function editSubmitHandler (evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeEditPopup();
}

editButton.addEventListener('click', openEditPopup);
editClose.addEventListener('click', closeEditPopup);
editForm.addEventListener('submit', editSubmitHandler); 

//функции обработки и слушатели для открытия, закрытия и обработки addPopup 

function openAddPopup() {
  addPopup.classList.add('popup_opened');
}

function closeAddPopup() {
  addPopup.classList.remove('popup_opened');
}

function addSubmitHandler (evt) {
  evt.preventDefault();
  const card = {};
  card.name = placeInput.value;
  card.link = srcInput.value;
  addCard(card);
  placeInput.value = '';
  srcInput.value = '';
  closeAddPopup();
}

addButton.addEventListener('click', openAddPopup);
addClose.addEventListener('click', closeAddPopup);
addForm.addEventListener('submit', addSubmitHandler); 
