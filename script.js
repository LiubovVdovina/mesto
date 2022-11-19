let editButton = document.querySelector('.button_type_edit');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.input__text_type_name');
let jobInput = popup.querySelector('.input__text_type_job');
let closeButton = popup.querySelector('.button_type_close');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 

console.log(innerHeight);