export const image = document.querySelector('.image');

export class Card  {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });
  }

  // _handleOpenPopup() {
  //   image.src = this._link;
  //   image.alt = this._name;
  //   document.querySelector('.popup__title-image').textContent = this._name;
  //   document.querySelector('.popup_type_more-image').classList.add("popup_opened");
  // }

  _handleLike() {
    this._element
      .querySelector(".element__icon")
      .classList.toggle("element__icon_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = "";
  }
}

