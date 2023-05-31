import Popup from './Popup.js'
import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirmation extends Popup { 
  constructor({ popupSelector, handleFormSubmit }) {
    super( { popupSelector });
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(card) {
    super.open();
    this._card = card;
  }

setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._card)
    this.close();
  });

}
}