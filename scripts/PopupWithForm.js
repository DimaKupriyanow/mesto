import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
    constructor({ popupSelector, callBack }) {
        super(popupSelector);
        this._callBack = callBack;
        this._popupSelector = popupSelector; 
        this._popupForm = document.querySelector(".form");
        // console.log(this._popupForm)
        // this._buttonSubmit = document.querySelector(".popup__button-submit");
        this._formError = document.querySelector(".form__input-error");

        

    }

    _getInputValues() {
        this._inputList = document.querySelectorAll(".form__input");

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

        })
    }

    close() {
        super.close();
        this._formError.textContent = "";
    }
}
