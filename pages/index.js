import "../src/index.css";

import { initialCards, validationConfig } from '../utils/constants.js';
import { Card }  from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from "../components/UserInfo.js";

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
const popupImage = new PopupWithImage(popupMoreImg);
const userInfo = new UserInfo({ selectorName: infoName, selectorInfo: infoClass });

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
        popupImage.open(evt);
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

popupImage.setEventListeners();
newSection.renderItems();

const popupEditProfile = new PopupWithForm({  // попап профиля
  popupElement: moreInfoPopup,
  callBack: (data) => {
    userInfo.setUserInfo( data.inputName, data.inputInfo )
    popupEditProfile.close();
}
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm({
  popupElement: moreInfoPopupItem,
  callBack: (data) => {
    const newCardData = {
      name: data.inputNameCard,
      link: data.inputLink,
    };
    popupAddCard.close();
    const cardElement = createCard(newCardData);
    newSection.addItem(cardElement);
  },
});
popupAddCard.setEventListeners();
       
addButtonItem.addEventListener("click", () => {  // открытие попапа с добавлением карточек
  popupAddCard.open();
});
  
changeButton.addEventListener("click", () => {  // открытие попапа с изменением профиля
  popupEditProfile.open();
});
