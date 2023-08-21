
export class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;

    this._buttonsClose = this._selector.querySelector(".popup__close");
  }

  open() {
    this._selector.classList.add("popup_opened");
  }

  close() {
    this._selector.classList.remove("popup_opened");
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

    addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    addEventListener("click", (evt) => {
      const popupOpened = document.querySelector(".popup_opened");
      if (evt.target === popupOpened) {
        this.close();
      }
    });
  }
}
