import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = popupSelector.querySelector(".image");
    this._title = popupSelector.querySelector(".popup__title-image");
    // this._popupSelector = popupSelector;
  }

  open(evt) {
    super.open();
    this._image.src = evt.target.src;
    this._title.alt = evt.target.alt;
    this._title.textContent = evt.target.alt;

  }
}

