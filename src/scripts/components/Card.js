export class Card {
  constructor({ data, templateSelector, curUserId, handleCardClick, handleDelete, handleLike }) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._curUserId = curUserId;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
  }

  getId() {
    return this._id;
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

  isLiked() {
    let isLiked = false;
    this._likes.forEach(like => {
      if (like._id == this._curUserId) {
        isLiked = true;
      }
    });
    return isLiked;
  }

  clickLike() {
    this._likeButton.classList.toggle('button_type_like_active');
  }

  countLikes(likes) {
    this._likes = likes;
    this._element.querySelector('.card__likes-number').textContent =  this._likes.length;
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.button_type_like');
    this._cardImgElement.addEventListener('click', ()=> this._handleCardClick(this._name, this._image));
    this._likeButton.addEventListener('click', this._handleLike);
    if(this._element.querySelector('.button_type_remove')) {
      this._element.querySelector('.button_type_remove').addEventListener('click', ()=> { 
        this._handleDelete();
       } );
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImgElement = this._element.querySelector('.card__img');
    this._setEventListeners();
    this._cardImgElement.src = this._image;
    this._cardImgElement.alt = this._name;
    this._element.querySelector('.card__caption').textContent = this._name;
    if(this.isLiked(this._likes)) {
      this.clickLike();
    }
    this.countLikes(this._likes);

    return this._element;
  }

}

