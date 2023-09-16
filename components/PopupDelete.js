import { Popup } from "./Popup.js";

export class PopupDelete extends Popup {
        constructor({ popupSelector, submitForm, popupForm }) {
            super(popupSelector);
            this._form = popupForm;
            this._handleSubmitForm = submitForm;
        }
    
        setEventListeners() {
            super.setEventListeners();
            this._form.addEventListener("submit", (evt) => {
                evt.preventDefault();
                this._handleSubmitForm(this._card);
            })
        }
    
        open(card) {
            this._card = card;
            super.open();
        }
    }