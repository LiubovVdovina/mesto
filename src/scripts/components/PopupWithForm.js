import Popup from './Popup.js'

export default class PopupWithForm extends Popup { 
  constructor({ popupSelector, handleFormSubmit }) {
    super( { popupSelector });
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    const inputData = {};
    this._inputList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;

  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name]
    })
  }
  
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}