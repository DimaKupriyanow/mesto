import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupElement = popupElement;
  }
}