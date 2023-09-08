import "../src/index.css";

import { validationConfig } from '../utils/constants.js'
import { Card }  from '../components/Card.js'; 
import { FormValidator } from '../components/FormValidator.js'; 
import { Section } from '../components/Section.js'; 
import { PopupWithImage } from '../components/PopupWithImage.js'; 
import { PopupWithForm } from '../components/PopupWithForm.js'; 
import { UserInfo } from "../components/UserInfo.js"; 
import { Api } from '../components/Api.js';
import { Popup } from '../components/Popup.js';
import { apiConfigCard, apiConfigProfileChange, apiConfigProfile } from '../components/Api.js'

export const avatar = document.querySelector(".profile__avatar");
const avatarProfile = document.querySelector(".profile__profile-avatar");
const nameProfile = document.querySelector(".profile__title");
const aboutProfile = document.querySelector(".profile__subtitle");
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
const buttonSubmitCard = document.querySelector(".popup__button-submit_add");
const buttonSubmitProfile = document.querySelector(".popup__button-submit_info")
const popupDelete = document.querySelector(".popup_delete-card");
const popupAvatar = document.querySelector(".popup_profile-avatar");
const popupAvatarForm = document.querySelector(".popup__container-avatar");
const buttonSubmitAvatar = document.querySelector(".popup__button-submit_avatar");
const apiCreateProfile = new Api(apiConfigProfile);
const apiCard = new Api(apiConfigCard);
const apiProfileChange = new Api(apiConfigProfileChange);
let resultApiProfile = await  apiCreateProfile.getUserInfo();

const popupImage = new PopupWithImage(popupMoreImg);
const userInfo = new UserInfo({ selectorName: infoName, selectorInfo: infoClass });
const popupDeleteCard = new Popup(popupDelete);

const formProfileValidator = new FormValidator(
  validationConfig,
  saveInfoPopupForm
);
const formAddCardValidator = new FormValidator(
  validationConfig,
  saveInfoPopupFormItem
);
const formAvatarValidator = new FormValidator(
  validationConfig,
  popupAvatarForm
);

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formAvatarValidator.enableValidation();

apiCreateProfile    // профиль с сервера
  .getInitialCards() 
  .then((data) => {
    nameProfile.textContent = data.name;
    aboutProfile.textContent = data.about;
    avatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err); 
  }); 

apiCard.getInitialCards()  // создание карточек
.then(data => {
  const newSection = new Section({
      items: data,
      renderer: (cardItem) => {
        const cardElement = createCard(cardItem);
        newSection.addItem(cardElement);
      },
    },
    elementsCard
)
  popupImage.setEventListeners();
newSection.renderItems();
})      
.catch((err) => {
  console.log(err); 
}); 

const createCard = (data) => {  
  const card = new Card(
    {
      data,
      handleCardClick: (evt) => {   // открытие попапа с картинкой
        popupImage.open(evt);
      },
      handleDelete: (id) => {       // удаление карточки
        apiCard
          .deleteCard(id)
          .then(data => {
            console.log(data)
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupDeleteCard.close();
          });
      },
      handlePopup: () => {          // отрытие попапа с вопросом удаления карточки
        popupDeleteCard.open();
        popupDeleteCard.setEventListeners();
      },
      setLikes: (id) => {  // добавить лайк
        apiCard
          .likeCard(id)
          .catch((err) => {
            console.log(err);
          });
      },
      deleteLikes: (id) => {  // удалить лайк
        apiCard
        .deleteLikesCard(id)
        .catch((err) => {
          console.log(err);
        });
      },
    },
    ".card-template_type_default",
    resultApiProfile
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const infoPopupForm = new PopupWithForm({    // изменение профиля через попап
  popupElement: moreInfoPopup,
  callBack: (data) => {
    buttonSubmitProfile.textContent = "Подождите...";
    apiProfileChange
      .changeProfile(data)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        infoPopupForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        buttonSubmitProfile.textContent = "Сохранить";
      });
  },
});
infoPopupForm.setEventListeners();

const infoPopupItemForm = new PopupWithForm({  // новая карточка
  popupElement: moreInfoPopupItem,
  callBack: (data) => {
    buttonSubmitCard.textContent = 'Подождите...'
    apiCard.createCardData(data) 
    .then(data => {
         infoPopupItemForm.close();
        const cardElement = createCard(data);
    document.querySelector(".elements").prepend( cardElement );
  })
    .catch((err) => {
      console.log(err); 
  })
    .finally(() => {
      buttonSubmitCard.textContent = 'Создать'
    })
  },
});
infoPopupItemForm.setEventListeners();

const popupChangeAvatar = new PopupWithForm({     // изменение аватара
  popupElement: popupAvatar,
  callBack: (data) => {
    buttonSubmitAvatar.textContent = 'Сохранение...';
    apiProfileChange.changeAvatar(data) 
    .then(data => {
      avatar.src = data.avatar;
      popupChangeAvatar.close()
    })
    .catch((err) => {
      console.log(err); 
    }) 
    .finally(() => {
      buttonSubmitAvatar.textContent = 'Сохранить';
    })
  }
})
popupChangeAvatar.setEventListeners();

addButtonItem.addEventListener("click", () => {  // открытие попапа с добавлением карточек
  infoPopupItemForm.open();
});
changeButton.addEventListener("click", () => {  // открытие попапа с изменением профиля
  infoPopupForm.open();
});  
avatarProfile.addEventListener("click", () => {  // открытие попапа с изменением аватара
popupChangeAvatar.open();
})
