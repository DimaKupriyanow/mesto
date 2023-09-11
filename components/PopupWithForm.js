import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupElement, callBack }) {
    super(popupElement);
    this._callBack = callBack;
    this._popupElement = popupElement;
    this._popupForm = this._popupElement.querySelector(".form");
    this._inputList = this._popupForm.querySelectorAll(".form__input");
  }

  _getInputValues() {  // собирает данные всех полей формы
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callBack(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
