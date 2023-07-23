import { initialCards, validationConfig } from './constants.js'
import { Card }  from './Card.js'
import { FormValidator } from './FormValidator.js'


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
const elementsCard = document.querySelector(".elements");
const buttonDisabledSubmit = document.getElementById("buttonInputItem");


const disableSubmitButton = (button) => {    // не активный submit
  button.setAttribute("disabled", true);
  button.classList.add("popup__button-submit_add");
  };


const deleteErrorElement = (form) => { // удаление текста ошибки
  form.querySelectorAll(".form__input-error").forEach((input) => {
    input.textContent = "";
  });
};
  
  
const closePopupEsc = (evt) => {   // закрытие попапа при нажатии на ESC
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
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
  popup.addEventListener("mousedown", closePopupOverlay);
};


const closePopup = (popup) => {  // общяя функция для закрытия popup
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupOverlay);
};
 

changeButton.addEventListener("click", () => {   // popup 1
  openPopup(moreInfoPopup);
  inputName.value = infoName.textContent;
  inputClass.value = infoClass.textContent;
  deleteErrorElement(saveInfoPopupForm); 
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
  disableSubmitButton(buttonDisabledSubmit);
  deleteErrorElement(saveInfoPopupFormItem);
  saveInfoPopupFormItem.reset();
});



initialCards.forEach((item) => {
  const card = new Card(item, ".card-template_type_default");
  const cardElement = card.generateCard();
  elementsCard.prepend(cardElement);
});


const saveFormSubmitImage = (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const card = new Card(newCardData, ".card-template_type_default");
  const cardElement = card.generateCard();

  elementsCard.prepend(cardElement);

  evt.target.reset();
  closePopup(moreInfoPopupItem);
};

saveInfoPopupFormItem.addEventListener("submit", saveFormSubmitImage);


const formProfileValidator = new FormValidator( validationConfig, saveInfoPopupForm );
const formAddCardValidator = new FormValidator( validationConfig, saveInfoPopupFormItem );


formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();




