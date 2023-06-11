const changeButton = document.querySelector(".profile__button-change");
const moreInfoPopup = document.querySelector(".popup_type_more-info");
const inputName = moreInfoPopup.querySelector(".popup__input-name");
const inputClass = moreInfoPopup.querySelector(".popup__input-name_more_heading");
const saveInfoPopupForm = moreInfoPopup.querySelector(".popup__container");
const infoName = document.querySelector(".profile__title");
const infoClass = document.querySelector(".profile__subtitle");
const addButtonItem = document.querySelector(".profile__button-add");
const moreInfoPopupItem = document.querySelector(".popup_type_more-item");
const saveInfoPopupFormItem = document.querySelector(".popup__container_item");
const nameInput = document.querySelector(".popup__input-name_item");
const linkInput = document.querySelector(".popup__input-name_more_link");
const popupMoreImage = document.querySelector(".popup_type_more-image");
const imagePopup = popupMoreImage.querySelector(".image");
const titleImagePopup = popupMoreImage.querySelector(".popup__title-image");

//закрытие попапа при нажатии клавиши esc и при клике на оверлей

const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(moreInfoPopup);
    closePopup(popupMoreImage);
    closePopup(moreInfoPopupItem);
  }
};

const closePopupOverlay = (evt) => {
  document.querySelectorAll(".popup").forEach((elem) => {
    if (evt.target === elem) {
      closePopup(elem);
    }
  });
};

const buttonsClosePopup = () => {
  document.querySelectorAll(".popup__close").forEach((elem) => {
    elem.addEventListener("click", (evt) => {
      if (evt.target === elem) {
        closePopup(moreInfoPopup);
        closePopup(popupMoreImage);
        closePopup(moreInfoPopupItem);
      }
    });
  });
};

// общяя функция для открытия popup

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closePopupOverlay);
  buttonsClosePopup();
};

// общяя функция для закрытия popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closePopupOverlay);
};
 
// первый попап

changeButton.addEventListener("click", () => {
  openPopup(moreInfoPopup);
  inputName.value = infoName.textContent;
  inputClass.value = infoClass.textContent;
  deleteErrorElement();
});

saveInfoPopupForm.addEventListener("submit", saveFormSubmit);

function saveFormSubmit(event) {
  event.preventDefault();
  infoName.textContent = inputName.value;
  infoClass.textContent = inputClass.value;
  closePopup(moreInfoPopup);
}

// создание карточек с фото

const templateCard = document.getElementById("images-card");
const imageGrid = document.querySelector(".elements");

const createImageElement = (imageData) => {
  const imageElement = templateCard.content
    .querySelector(".element")
    .cloneNode(true);
  const imageName = imageElement.querySelector(".element__title");
  const myImage = imageElement.querySelector(".element__image");

  imageName.textContent = imageData.name;
  myImage.src = imageData.link;
  myImage.alt = imageData.name;

  const likeButton = imageElement.querySelector(".element__icon");
  const deleteButton = imageElement.querySelector(".element__delete");

  const handleLike = () => {
    likeButton.classList.toggle("element__icon_active");
  };

  const handleButton = () => {
    imageElement.remove();
  };

  myImage.addEventListener("click", () => {
    imagePopup.src = imageData.link;
    imagePopup.alt = imageData.link;
    titleImagePopup.textContent = imageData.name;
    openPopup(popupMoreImage);
  });

  likeButton.addEventListener("click", handleLike);
  deleteButton.addEventListener("click", handleButton);

  return imageElement;
};

const renderImageElement = (imageElement) => {
  imageGrid.prepend(imageElement);
};

initialCards.forEach((image) => {
  renderImageElement(createImageElement(image));
});

//popup 2

addButtonItem.addEventListener("click", () => {
  openPopup(moreInfoPopupItem);
  disableSubmitButton();
  deleteErrorElement();
  saveInfoPopupFormItem.reset();
});

const saveFormSubmitImage = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const link = linkInput.value;

  const imageData = {
    name,
    link,
  };

  renderImageElement(createImageElement(imageData));
  closePopup(moreInfoPopupItem);
  evt.target.reset();
};

saveInfoPopupFormItem.addEventListener("submit", saveFormSubmitImage);
