import { api } from '../../pages/index.js'
export class Card {
  constructor({ data, templateSelector, curUserId, handleCardClick }) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._curUserId = curUserId;
    this._handleCardClick = handleCardClick;
    this._clickLike = this._clickLike.bind(this)
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

      if(this._curUserId != this._ownerId) {
        cardElement.querySelector('.button_type_remove').remove();
      }
      
    return cardElement;
  }

  _isLiked(likes) {
    let isLiked = false;
    likes.forEach(like => {
      if (like._id == this._curUserId) {
        isLiked = true;
      }
    });
    return isLiked;
  }

  _clickLike(evt) {
    evt.target.classList.toggle('button_type_like_active');
    if(this._isLiked(this._likes)) {
      api.removeLike(this._id).then(res => {
        this._likes = res.likes;
        this._countlikes();
      })
    } else {
      api.putLike(this._id).then(res => {
        this._likes = res.likes;
        this._countlikes();
      });
    }
  }

  _countlikes() {
    this._element.querySelector('.card__likes-number').textContent = this._likes.length;
  }

  _removeCard() {
    this._element.remove();
    api.removeCard(this._id);
  }

  _setEventListeners() {
    this._cardImgElement.addEventListener('click', ()=> this._handleCardClick(this._name, this._image));
    this._element.querySelector('.button_type_like').addEventListener('click', (evt) => this._clickLike(evt));
    if(this._element.querySelector('.button_type_remove')) {
      this._element.querySelector('.button_type_remove').addEventListener('click', this._removeCard);
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImgElement = this._element.querySelector('.card__img');
    this._setEventListeners();
    this._cardImgElement.src = this._image;
    this._cardImgElement.alt = this._name;
    this._element.querySelector('.card__caption').textContent = this._name;
    if(this._isLiked(this._likes)) {
      this._element.querySelector('.button_type_like').classList.toggle('button_type_like_active');
    }
    this._countlikes();

    return this._element;
  }

}

