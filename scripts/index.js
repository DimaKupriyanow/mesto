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
const buttonsClosePopup = document.querySelectorAll(".popup__close");


const disableSubmitButton = () => {    // неактивкая кнопка
  const buttonInputElement = document.getElementById("buttonInputItem");
  buttonInputElement.setAttribute("disabled", true);
  buttonInputElement.classList.add("popup__button-submit_add");
};

const deleteErrorElement = () => {  // удаление текста ошибки
  const formInputError = document.querySelectorAll(".form__input-error");
  formInputError.forEach((elem) => {
    elem.textContent = "";
  });
};

const closePopupEsc = (evt) => {   // закрытие попапа при нажатии на ESC
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
};

const closePopupOverlay = (evt) => {   // закрытие попапа при нажатии на Overlay
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.target === popupOpened) {
    closePopup(popupOpened);
  }
};


buttonsClosePopup.forEach((elem) => {  
  elem.addEventListener("click", (evt) => {
    const popupOpened = document.querySelector(".popup_opened");
    if (evt.target === elem) {
      closePopup(popupOpened);
    }
  });
});


const openPopup = (popup) => {  // общяя функция для открытия popup
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closePopupOverlay);
};


const closePopup = (popup) => {  // общяя функция для закрытия popup
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closePopupOverlay);
};
 

changeButton.addEventListener("click", () => {   // popup 1
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
};


addButtonItem.addEventListener("click", () => {   //popup 2
  openPopup(moreInfoPopupItem);
  disableSubmitButton();
  deleteErrorElement();
  saveInfoPopupFormItem.reset();
});


const renderImageElement = () => {   // рендер карточек
  initialCards.forEach((item) => {
    const card = new Card(item, ".card-template_type_default");
    const cardElement = card.generateCard();

    document.querySelector(".elements").prepend(cardElement);
  });
};


const saveFormSubmitImage = (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const card = new Card(newCardData, ".card-template_type_default");
  const cardElement = card.generateCard();

  document.querySelector(".elements").prepend(cardElement);

  evt.target.reset();
};

saveInfoPopupFormItem.addEventListener("submit", saveFormSubmitImage);

renderImageElement();

import  Card  from './Card.js'
