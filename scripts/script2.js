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


const openPopup = (popup) => {
  popup.classList.add("popup_opened"); // общяя функция для открытия popup
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened"); // общяя функция для закрытия popup
};

const popupClose = document
  .querySelectorAll(".popup__close")
  .forEach((elem) => {
    elem.addEventListener("click", () => {
      closePopup(moreInfoPopup);
      closePopup(popupMoreImage);
      closePopup(moreInfoPopupItem);
    });
  });

// первый попап

changeButton.addEventListener("click", () => {
  openPopup(moreInfoPopup);
  inputName.value = infoName.textContent;
  inputClass.value = infoClass.textContent;
});

saveInfoPopupForm.addEventListener("submit", saveFormSubmit);
function saveFormSubmit(event) {
  event.preventDefault();
  infoName.textContent = inputName.value;
  infoClass.textContent = inputClass.value;
  closePopup(moreInfoPopup);
}

// создание карточек с фото

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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

  // popup 3

  // myImage.addEventListener("click", () => {
  //   popupMoreImage.querySelector(".image").src = imageData.link;
  //   popupMoreImage.querySelector(".image").alt = imageData.link;
  //   popupMoreImage.querySelector(".popup__title-image").textContent =
  //     imageData.name;
  //   openPopup(popupMoreImage);
  // });

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






