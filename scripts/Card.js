import {openPopup} from './index.js'

const popupImg = document.querySelector('.popup_type_img');
const imagePopupElement = popupImg.querySelector('.popup__img');
const captionPopupElement = popupImg.querySelector('.popup__caption');

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _openImgPopup() {
    imagePopupElement.src = this._image;
    imagePopupElement.alt = this._name;
    captionPopupElement.textContent = this._name;
    openPopup(popupImg);
  }

  _clickLike() {
    this.classList.toggle('card__like_active');
  }

  _removeCard = () => {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__img').addEventListener('click', () => this._openImgPopup());
    this._element.querySelector('.card__like').addEventListener('click', this._clickLike);
    this._element.querySelector('.button_type_remove').addEventListener('click', this._removeCard);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
    this._element.querySelector('.card__img').src = this._image;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__caption').textContent = this._name;
    
    return this._element;
  }

}