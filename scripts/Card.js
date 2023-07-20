
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__icon")
      .addEventListener("click", () => {
        this._handleLike();
      });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDelete();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
  }

  _handleOpenPopup() {
    document.querySelector('.image').src = this._link;
    document.querySelector('.image').alt = this._link;
    document.querySelector('.popup__title-image').textContent = this._name;
    document.querySelector('.popup_type_more-image').classList.add("popup_opened");
  }

  _handleLike() {
    this._element
      .querySelector(".element__icon")
      .classList.toggle("element__icon_active");
  }

  _handleDelete() {
    this._element.remove();
  }
}

