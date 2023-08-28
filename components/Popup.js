
export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._buttonsClose = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  
  setEventListeners() {
    this._buttonsClose
    .addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    this._popupElement.addEventListener("click", (evt) => {
      const popupOpened = document.querySelector(".popup_opened");
      if (evt.target === popupOpened) {
        this.close();
      }
    });
  }
}
