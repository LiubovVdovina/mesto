export class Card {
  constructor({ data, templateSelector, handleCardClick }) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _clickLike() {
    this.classList.toggle('card__like_active');
  }

  _removeCard = () => {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImgElement.addEventListener('click', ()=> this._handleCardClick(this._name, this._image));
    this._element.querySelector('.card__like').addEventListener('click', this._clickLike);
    this._element.querySelector('.button_type_remove').addEventListener('click', this._removeCard);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImgElement = this._element.querySelector('.card__img');
    this._setEventListeners();
    this._cardImgElement.src = this._image;
    this._cardImgElement.alt = this._name;
    this._element.querySelector('.card__caption').textContent = this._name;
    
    return this._element;
  }

}

