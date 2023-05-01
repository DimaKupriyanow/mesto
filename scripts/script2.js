const changeButton = document.querySelector('.profile__button-change');
const moreInfoPopup = document.querySelector('.popup_type_more-info');
const moreInfoClose = moreInfoPopup.querySelector('.popup__close');
const inputName = moreInfoPopup.querySelector('.popup__input-name');
const inputClass = moreInfoPopup.querySelector('.popup__input-name_more_heading');
const saveInfoPopupForm = moreInfoPopup.querySelector('.popup__container');
const infoName = document.querySelector('.profile__title');
const infoClass = document.querySelector('.profile__subtitle');
const addButtonItem = document.querySelector(".profile__button-add");
const moreInfoPopupItem = document.querySelector(".popup_type_more-item");
const saveInfoPopupFormItem = document.querySelector(".popup__container_item");
const moreInfoCloseItem = document.querySelector(".popup__close_item");
const nameInput = document.querySelector(".popup__input-name_item");
const linkInput = document.querySelector(".popup__input-name_more_link");

const openPopup = (popup) => {
  popup.classList.add("popup_opened"); // общяя функция для открытия popup
};

const closePopup = (popup) => {
  // общяя функция для закрытия popup
  popup.classList.remove("popup_opened");
};

// первый попап

changeButton.addEventListener("click", () => {
  openPopup(moreInfoPopup);
  inputName.value = infoName.textContent;
  inputClass.value = infoClass.textContent;
});

moreInfoClose.addEventListener("click", () => {
  closePopup(moreInfoPopup);
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

  imageName.innerHTML = imageData.name;
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

  const popupMoreImage = document.querySelector(".popup_type_more-image");
  const closePopupImage = document.querySelector(".popup__close-image");

  myImage.addEventListener("click", () => {
    popupMoreImage.querySelector(".image").src = imageData.link;
    popupMoreImage.querySelector(".popup__title-image").textContent =
      imageData.name;
    openPopup(popupMoreImage);
  });

  closePopupImage.addEventListener("click", () => {
    closePopup(popupMoreImage);
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

moreInfoCloseItem.addEventListener("click", () => {
  closePopup(moreInfoPopupItem);
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


//popup 3 который должен открывать картинку 

// const template = document.getElementById('images-card');
// const popupImage = document.querySelector('.popup__container-image');
// const popupMoreImage = document.querySelector('.popup_type_more-image');
// const popupTitleImage = popupMoreImage.querySelector('.popup__title-image');
// const buttonAddImage = document.querySelector('.buttonAddImage');               
// let image = document.querySelector('.image');
// let imageTitle = document.querySelector('.popup__title-image');
// const elementImageAdd = document.querySelector('.element__image_add');
// const closePopupImage = document.querySelector('.popup__close-image');

// closePopupImage.addEventListener('click', () => {
//     closePopup(popupMoreImage)
//     });


// const createCardImage = (data) => {  
// const htmlElement = template.content.querySelector('.element').cloneNode(true);

// let imageName = htmlElement.querySelector('.element__title');
// let imageOpenPopup = htmlElement.querySelector('.element__image');



// // elementImageAdd.addEventListener('click', (data) => {
// //     openPopup(popupMoreImage);
// // })

//   imageName.textContent = data.name;
//   imageOpenPopup.src = data.link;
// }

 
// const openedPopup = (popup, imageIndex) => {
//     image.alt = initialCards[imageIndex].name;
//     image.src = initialCards[imageIndex].link;
//     imageTitle.textContent = initialCards[imageIndex].name;
//     popup.classList.add("popup_opened");
// } 

// const renderImageElementPopup = (htmlElement) => {
//   popupImage.prepend(htmlElement);
// };


// elementImageAdd.addEventListener('click', (e) => {
//     var imageIndex = e.target.dataset.image_index
//   openedPopup(popupMoreImage, imageIndex);
// });

// closePopupImage.addEventListener('click', () => {
// closePopup(popupMoreImage)
// });

// const handleEditImage = (evt) => {
//   evt.preventDefault();
//   popupImage.querySelector('element__image').src = data.link;
//   popupTitleImage.querySelector('element__title').textContent = data.name;

//   const imageData = {name, link};  // name почему-то устарело!
// }