import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._image = popupElement.querySelector(".image");
    this._title = popupElement.querySelector(".popup__title-image");
  }

  open(evt) {
    super.open();
    this._image.src = evt.target.src;
    this._title.alt = evt.target.alt;
    this._title.textContent = evt.target.alt;
  }
}

