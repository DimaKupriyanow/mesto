
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
    this.like();

    return this._element;
  }

  like() {
    if (this._likes.some((likes) => likes._id === this._configUserId))
      this._likeButton.classList.toggle("element__icon_active");
  }

  _setData() {
    this._elementLikes.textContent = this._likes.length;
    this._element.querySelector(".element__title").textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
  }

  _showIconDelete() {
    if (this._configUserId != this._idUser) {
      this._deleteButton.remove();
    }
  }

  _setEventListeners() {
    this._image = this._element.querySelector(".element__image");
    this._elementLikes = this._element.querySelector(".element__likes");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._likeButton = this._element.querySelector(".element__icon");

    this._likeButton.addEventListener("click", (evt) => {
      this._buttonLikes(evt);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handlePopup();
    });

    this._image.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  handleLike(res) {
    this._likeButton.classList.toggle("element__icon_active");
    this._elementLikes.textContent = res.likes.length;
  }

  handleDeleteLike(res) {
    this._likeButton.classList.remove("element__icon_active");
    this._elementLikes.textContent = res.likes.length;
  }

  elementDelete() {
    this._element.remove();
    this._element = "";
  }

  _buttonLikes(evt) {
    // добавление лайка и удаление
    const elementIconActive = this._element.querySelector(".element__icon_active");
    if (evt.target === elementIconActive) {
      this._deleteLikes(this._id);
    } else if (evt.target === this._likeButton) {
      this._setLikes(this._id);
    }
  }
}


