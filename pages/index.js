// import "./index.css";
import "../src/index.css";

import { initialCards, validationConfig } from '../components/constants.js';
import { Card }  from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';


const changeButton = document.querySelector(".profile__button-change");
const moreInfoPopup = document.querySelector(".popup_type_more-info");
const saveInfoPopupForm = moreInfoPopup.querySelector(".popup__container");
const infoName = document.querySelector(".profile__title");
const infoClass = document.querySelector(".profile__subtitle");
const addButtonItem = document.querySelector(".profile__button-add");
const moreInfoPopupItem = document.querySelector(".popup_type_more-item");
const saveInfoPopupFormItem = document.querySelector(".popup__container_item");
const elementsCard = document.querySelector(".elements");
const popupMoreImg = document.querySelector(".popup_type_more-image");
const newPopupImage = new PopupWithImage(popupMoreImg);

const formProfileValidator = new FormValidator(
  validationConfig,
  saveInfoPopupForm
);
const formAddCardValidator = new FormValidator(
  validationConfig,
  saveInfoPopupFormItem
);

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

const createCard = (data) => {  // создание класса Card
  const card = new Card(
    {
      data,
      handleCardClick: (evt) => {
        newPopupImage.open(evt);
      },
    },
    ".card-template_type_default"
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const newSection = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      newSection.addItem(cardElement);
    },
  },
  elementsCard
);

newPopupImage.setEventListeners();
newSection.rendererItems();

const infoPopupForm = new PopupWithForm({  // попап профиля
  popupSelector: moreInfoPopup,
  callBack: (data) => {
    console.log(data)
    infoName.textContent = data.inputName;
    infoClass.textContent = data.inputInfo;
    infoPopupForm.close();
}
});
infoPopupForm.setEventListeners();

const infoPopupItemForm = new PopupWithForm({
  popupSelector: moreInfoPopupItem,
  callBack: (data) => {
    const newCardData = {
      name: data.inputNameCard,
      link: data.inputLink,
    };
    infoPopupItemForm.close();
    const cardElement = createCard(newCardData);
    newSection.addItem(cardElement);
  },
});
infoPopupItemForm.setEventListeners();
       
addButtonItem.addEventListener("click", () => {  // открытие попапа с добавлением карточек
  infoPopupItemForm.open();
});
  
changeButton.addEventListener("click", () => {  // открытие попапа с изменением профиля
  infoPopupForm.open();
});
