
export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._buttonsClose = popupElement.querySelector(".popup__close");
    this._closePopupEsc = this._closePopupEsc.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closePopupEsc); 
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupEsc);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      } 
    }

    _closePopupEsc() {
      document.addEventListener("keydown", (evt) => {
        this._handleEscClose(evt);
      })
    }
  
  setEventListeners() {
    this._buttonsClose
    .addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (evt) => {
      const popupOpened = document.querySelector(".popup_opened");
      if (evt.target === popupOpened) {
        this.close();
      }
    });
  }
}
