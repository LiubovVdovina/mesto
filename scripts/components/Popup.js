export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    // this.open = this.open.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.add('popup_opened');
    
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {

    this._popup.querySelector('.button_type_close').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}