
export class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleDelete,
      handlePopup,
      setLikes,
      deleteLikes,
      infoLikes,
    },
    templateSelector,
    configUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handlePopup = handlePopup;
    this._handleDelete = handleDelete;
    this._id = data._id;
    this._idUser = data.owner._id;
    this._likes = data.likes;
    this._setLikes = setLikes;
    this._deleteLikes = deleteLikes;
    this._infoLikes = infoLikes;
    this._configUserId = configUserId._id;
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
    this._setData();
    this._showIconDelete();
    this._image = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__icon");
    this._likeButtonActive = this._element.querySelector(".element__icon_active");
    this._deleteButton = this._element.querySelector(".element__delete");
    console.log(this._image)

    return this._element;
  }

  _setData() {
    this._element.querySelector(".element__likes").textContent =
      this._likes.length;
    this._element.querySelector(".element__title").textContent = this._name;
    const image = this._element.querySelector(".element__image");
    image.src = this._link;
    image.alt = this._name;

  }

  _showIconDelete() {
    if (this._configUserId === this._idUser) {
    } else if (this._configUserId != this._idUser) {
      this._element.querySelector(".element__delete").remove();

    }
  }

  _setEventListeners() {
  
    this._element.querySelector(".element__icon")    
    .addEventListener("click", (evt) => {
        this._buttonLikes(evt);
        this._handleLike(evt);
      });

   
      this._element.querySelector(".element__delete").addEventListener("click", () => {
        this._handlePopup();
        this._handleSubmitDelete();
      });

   
      // this._element.querySelector(".element__image")
      this._image.addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });
  }

  _handleSubmitDelete() {
    const buttonDeleteSubmit = document
      .querySelector(".popup__button-submit_delete");
      console.log(buttonDeleteSubmit);
      buttonDeleteSubmit.addEventListener("click", (evt) => {
        if (buttonDeleteSubmit === evt.target) {
          this._elementDelete();
          this._handleDelete(this._id);
        }
      });
  }

  _handleLike() {
    this._element.querySelector(".element__icon").classList.toggle(".element__icon_active");
  }

  _elementDelete() {
    this._element.remove();
    this._element = "";
  }

  _buttonLikes(evt) {      // добавление лайка и удаление
    if (evt.target === this._likeButtonActive) {
      this._deleteLikes(this._id);
    } else if (evt.target === this._likeButton) {
      this._setLikes(this._id);
    }
  }
}


