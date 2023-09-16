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
import { PopupDelete } from '../components/PopupDelete.js'

const avatar = document.querySelector(".profile__avatar");
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
const buttonSubmitCard = document.querySelector(".popup__button-submit_avatar");
const buttonSubmitProfile = document.querySelector(".popup__button-submit_info")
const popupDelete = document.querySelector(".popup_delete-card");
const buttonDeleteSubmit = document.querySelector(".popup__button-submit_delete");
const popupAvatar = document.querySelector(".popup_profile-avatar");
const popupAvatarForm = document.querySelector(".popup__container-avatar");
const buttonSubmitAvatar = document.querySelector(".popup__button-submit_avatar");
const popupFormDelete = popupDelete.querySelector(".popup__container-delete");

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

const apiCard = new Api(apiConfig);
const popupImage = new PopupWithImage(popupMoreImg);
const userInfo = new UserInfo({ selectorName: infoName, selectorInfo: infoClass, selectorAvatar: avatar });

const apiProfileConst = apiCard
.getUserInfo()
.catch((err) => {
    console.log(err);
});
const resultApiProfile = await apiCard
.getUserInfo() // мне нужен просто результат resultApiProfile, c try catch я не могу его вытащить.
.catch((err) => {
    console.log(err);
  });
const apiCardConst = await apiCard
.getInitialCards()
.catch((err) => {
    console.log(err);
});

const popupDeleteCard = new PopupDelete({
  popupSelector: popupDelete,
  popupForm: popupFormDelete,
  submitForm: (card) => {
    buttonDeleteSubmit.textContent = "Удаление..."
    apiCard
      .deleteCard(card._id)
      .then(() => {
        card.elementDelete();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        buttonDeleteSubmit.textContent = "Да"
      })
  },
});
  
const setUserData = (data) => {
  userInfo.setUserInfo({name: data.name, about: data.about, avatar: data.avatar })
}

const setInfoObject = (nameInput, infoInput) => {
const infoObject = userInfo.getUserInfo();
nameInput.value = infoObject.name;
infoInput.value = infoObject.info;
};

const newSection = new Section({
    items: apiCardConst,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      newSection.addItem(cardElement);
    },
  },
  elementsCard
);

Promise.all([apiProfileConst, apiCardConst])
  .then(([userData]) => { 
    setUserData(userData);    // загрузка данных профиля с сервера
    newSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const createCard = (data) => {  
  const card = new Card({
      data,
      handleCardClick: (evt) => {  // открытие попапа с картинкой
        popupImage.open(evt);
      },
      handlePopup: () => {  // отрытие попапа с вопросом удаления карточки
          popupDeleteCard.open(card);
      },
      setLikes: (id) => {   
        apiCard.likeCard(id)
          .then((res) => {
            card.handleLike(res)
          })
          .catch((err) => {
            console.log(err);
          });
      },
      deleteLikes: (id) => {
        apiCard.deleteLikesCard(id)
        .then((res) => {
            card.handleDeleteLike(res)
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
  formAddCardValidator.disableSubmitButton();
  formAddCardValidator.deleteErrorElement();

});
changeButton.addEventListener("click", () => {  // открытие попапа с изменением профиля
  infoPopupForm.open();
  setInfoObject(nameInput, infoInput);
  formProfileValidator.deleteErrorElement();

});  
avatarProfile.addEventListener("click", () => {  // открытие попапа с изменением аватара
popupChangeAvatar.open();
formAvatarValidator.disableSubmitButton();
formAvatarValidator.deleteErrorElement();
});

popupImage.setEventListeners();
popupDeleteCard.setEventListeners();
infoPopupForm.setEventListeners();
infoPopupItemForm.setEventListeners();
popupChangeAvatar.setEventListeners();
