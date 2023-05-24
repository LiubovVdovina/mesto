import {imagePopupElement, captionPopupElement} from '../utils/constants.js'
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link }) {
    imagePopupElement.src = link;
    imagePopupElement.alt = name;
    captionPopupElement.textContent = name;
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.add('popup_opened');
  }
}