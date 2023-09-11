import "../src/index.css";
import { validationConfig } from '../utils/constants.js'
import { Card }  from '../components/Card.js'; 
import { FormValidator } from '../components/FormValidator.js'; 
import { Section } from '../components/Section.js'; 
import { PopupWithImage } from '../components/PopupWithImage.js'; 
import { PopupWithForm } from '../components/PopupWithForm.js'; 
import { UserInfo } from "../components/UserInfo.js"; 
import { Api } from '../components/Api.js';
import { apiConfig } from '../components/Api.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'

export const avatar = document.querySelector(".profile__avatar");
const avatarProfile = document.querySelector(".profile__profile-avatar");
const nameInput = document.querySelector(".popup__input-name_info");
const infoInput = document.querySelector(".popup__input-name_more_heading");
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
export const buttonDeleteSubmit = document.querySelector(".popup__button-submit_delete");
const popupAvatar = document.querySelector(".popup_profile-avatar");
const popupAvatarForm = document.querySelector(".popup__container-avatar");
const buttonSubmitAvatar = document.querySelector(".popup__button-submit_avatar");
export const deleteElem = document.querySelector(".element__delete");

const apiCard = new Api(apiConfig);
const popupImage = new PopupWithImage(popupMoreImg);
const popupDeleteCard = new PopupWithConfirmation(popupDelete);
const userInfo = new UserInfo({ selectorName: infoName, selectorInfo: infoClass, selectorAvatar: avatar });

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

const apiProfileConst = apiCard.getUserInfo();
const apiCardConst = apiCard.getInitialCards();
let resultApiProfile = await  apiCard.getUserInfo();

const setUserData = (data) => {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
    avatar: data.avatar,
  });
};

const setInfoObject = (nameInput, infoInput) => {
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  infoInput.value = infoObject.info;
};

const newSectionCard = (cards, selector) => {
  const newSection = new Section(
    {
      items: cards,
      renderer: (cardItem) => {
        const cardElement = createCard(cardItem);
        newSection.addItem(cardElement);
      },
    },
    selector
  );
  return newSection;
};

Promise.all([apiProfileConst, apiCardConst])
  .then(([userData, cards]) => {
    setUserData(userData); // загрузка данных профиля с сервера
    newSectionCard(cards, elementsCard).renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const createCard = (data) => {  
  const card = new Card(
    {
      data,
      handleCardClick: (evt) => {  // открытие попапа с картинкой
        popupImage.open(evt);
      },
      handleDelete: (id) => {   // удаление карточки
        apiCard.deleteCard(id)
        .then(() => {
          card.elementDelete()
          popupDeleteCard.close();
        })
          .catch((err) => {
            console.log(err);
          })
      },
      handlePopup: () => {  // отрытие попапа с вопросом удаления карточки
        popupDeleteCard.open();
        card.handleSubmitDelete(buttonDeleteSubmit)
      },
      setLikes: (id) => {
        apiCard.likeCard(id)
          .then(() => {
            card.handleLike()
          })
          .catch((err) => {
            console.log(err);
          });
      },
      deleteLikes: (id) => {
        apiCard.deleteLikesCard(id)
          .then(() => {
            card.handleDeleteLike()
        })
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

const infoPopupForm = new PopupWithForm({  // изменение профиля через попап
  popupElement: moreInfoPopup,
  callBack: (data) => {
    buttonSubmitProfile.textContent = "Подождите...";
    apiCard.changeProfile(data)
      .then((data) => {
        setUserData(data);
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

const infoPopupItemForm = new PopupWithForm({  // новая карточка
  popupElement: moreInfoPopupItem,
  callBack: (data) => {
    buttonSubmitCard.textContent = 'Подождите...'
    apiCard.createCardData(data) 
    .then(data => {
      const cardElement = createCard(data);
      const newSection = new Section({}, elementsCard);
      newSection.addItem(cardElement)
      infoPopupItemForm.close()
  })
    .catch((err) => {
      console.log(err); 
  })
    .finally(() => {
      buttonSubmitCard.textContent = 'Создать'
    })
  },
});

const popupChangeAvatar = new PopupWithForm({     // изменение аватара
  popupElement: popupAvatar,
  callBack: (data) => {
    buttonSubmitAvatar.textContent = 'Сохранение...';
    apiCard.changeAvatar(data) 
    .then(data => {
      setUserData(data);
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

addButtonItem.addEventListener("click", () => {  // открытие попапа с добавлением карточек
  infoPopupItemForm.open();

});
changeButton.addEventListener("click", () => {  // открытие попапа с изменением профиля
  infoPopupForm.open();
  setInfoObject(nameInput, infoInput);

});  
avatarProfile.addEventListener("click", () => {  // открытие попапа с изменением аватара
popupChangeAvatar.open();
});

popupImage.setEventListeners();
popupDeleteCard.setEventListeners();
infoPopupForm.setEventListeners();
infoPopupItemForm.setEventListeners();
popupChangeAvatar.setEventListeners();