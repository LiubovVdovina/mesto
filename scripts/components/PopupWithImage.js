import {imagePopupElement, captionPopupElement} from '../utils/constants.js'
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image) {
    imagePopupElement.src = image.link;
    imagePopupElement.alt = image.name;
    captionPopupElement.textContent = image.name;
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.add('popup_opened');
  }
}