import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup { 
  constructor({ popupSelector, handleFormSubmit }) {
    super( { popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
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