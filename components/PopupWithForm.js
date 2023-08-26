import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, callBack }) {
    super(popupSelector);
    this._callBack = callBack;
    this._popupSelector = popupSelector;
    this._popupForm = popupSelector.querySelector(".form");
  }

  _getInputValues() {  // собирает данные всех полей формы
    this._inputList = this._popupForm.querySelectorAll(".form__input");
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
    this._formValues = "";
  }
}
