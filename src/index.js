import "./index.css";
import { initialCards, validationConfig } from './constants.js'
import { Card }  from './Card.js'
import { FormValidator } from './FormValidator.js'
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';


const changeButton = document.querySelector(".profile__button-change");
const moreInfoPopup = document.querySelector(".popup_type_more-info");
const inputName = moreInfoPopup.querySelector(".popup__input-name_info");
const inputClass = moreInfoPopup.querySelector(".popup__input-name_more_heading");
const saveInfoPopupForm = moreInfoPopup.querySelector(".popup__container");
const infoName = document.querySelector(".profile__title");
const infoClass = document.querySelector(".profile__subtitle");
const addButtonItem = document.querySelector(".profile__button-add");
const moreInfoPopupItem = document.querySelector(".popup_type_more-item");
const saveInfoPopupFormItem = document.querySelector(".popup__container_item");
const nameInput = document.querySelector(".popup__input-name_item");
const linkInput = document.querySelector(".popup__input-name_more_link");
const elementsCard = document.querySelector(".elements");
const popupMoreImg = document.querySelector(".popup_type_more-image");


const formProfileValidator = new FormValidator( validationConfig, saveInfoPopupForm );
const formAddCardValidator = new FormValidator( validationConfig, saveInfoPopupFormItem );


formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();


const newSection = new Section({
  items: initialCards,
  renderer: (cardItem) => {
      const card = new Card({
        data: cardItem,
        handleCardClick: (evt) => {
          const newPopupImage = new PopupWithImage(popupMoreImg);
          newPopupImage.open(evt);
          newPopupImage.setEventListeners();

        }
      }, ".card-template_type_default");
    
      const cardElement = card.generateCard();
      newSection.addItem(cardElement);
  },
}, elementsCard
);

newSection.rendererItems();


 changeButton.addEventListener("click", () => {    // popup изменения профиля
   const popupSelector = new Popup(moreInfoPopup);

   const infoPopup = new PopupWithForm({
     popupSelector: moreInfoPopup,
     callBack: () => {
       const userInfo = new UserInfo(inputName, inputClass);
       userInfo.setUserInfo({
        nameInput: infoName,
        infoInput: infoClass
      });
       infoPopup.close();

       userInfo.getUserInfo({
          nameProf: infoName, 
          infoProf: infoClass
        })
      
     }
   });
   popupSelector.open();
   popupSelector.setEventListeners();
   infoPopup.setEventListeners();
  });




  addButtonItem.addEventListener("click", () => {        // popup изменения карточек
    const popupSelector = new Popup(moreInfoPopupItem);

    const infoPopup = new PopupWithForm({
      popupSelector: moreInfoPopupItem,
      callBack: () => {
        const newCardData = {
          name: nameInput.value,
          link: linkInput.value,
        };
        infoPopup.close();

        const card = new Card(
          {
            data: newCardData,
          },
          ".card-template_type_default"
        );

        const cardElement = card.generateCard();
        elementsCard.prepend(cardElement);
      },
    });
    popupSelector.open();
    popupSelector.setEventListeners();
    infoPopup.setEventListeners();
  });



// const disableSubmitButton = (button) => {    // не активный submit
//   button.setAttribute("disabled", true);
//   button.classList.add("popup__button-submit_add");
//   };


// const deleteErrorElement = (form) => { // удаление текста ошибки
//   form.querySelectorAll(".form__input-error").forEach((input) => {
//     input.textContent = "";
//   });
// };

// const openPopup = (popup) => {  // общяя функция для открытия popup
//   popup.classList.add("popup_opened");
//   // document.addEventListener("keydown", closePopupEsc);
//   // popup.addEventListener("mousedown", closePopupOverlay);
// };


// const closePopup = (popup) => {  // общяя функция для закрытия popup
//   popup.classList.remove("popup_opened");
//   // document.removeEventListener("keydown", closePopupEsc);
//   // popup.removeEventListener("mousedown", closePopupOverlay);
// };
 

// changeButton.addEventListener("click", () => {   // popup 1
//   // openPopup(moreInfoPopup);
//   infoPopup.open();
//   inputName.value = infoName.textContent;
//   inputClass.value = infoClass.textContent;
//   deleteErrorElement(saveInfoPopupForm); 
// });

// saveInfoPopupForm.addEventListener("submit", saveFormSubmit);

// function saveFormSubmit(event) {
//   event.preventDefault();
//   infoName.textContent = inputName.value;
//   infoClass.textContent = inputClass.value;
//   closePopup(moreInfoPopup);
// };


// addButtonItem.addEventListener("click", () => {   //popup 2
//   // openPopup(moreInfoPopupItem);
//   popupItem.open();
//   disableSubmitButton(buttonDisabledSubmit);
//   deleteErrorElement(saveInfoPopupFormItem);
//   saveInfoPopupFormItem.reset();
// });


// const saveFormSubmitImage = (evt) => {
//   evt.preventDefault();

//   const newCardData = {
//     name: nameInput.value,
//     link: linkInput.value,
//   };

//   const card = new Card(newCardData, ".card-template_type_default");
//   const cardElement = card.generateCard();

//   elementsCard.prepend(cardElement);

//   evt.target.reset();
//   closePopup(moreInfoPopupItem);
// };

// saveInfoPopupFormItem.addEventListener("submit", saveFormSubmitImage);