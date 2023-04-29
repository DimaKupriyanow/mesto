const changeButton = document.querySelector('.profile__button-change');
const moreInfoPopup = document.querySelector('.popup_type_more-info');
const moreInfoClose = moreInfoPopup.querySelector('.popup__close');
const inputName = moreInfoPopup.querySelector('.popup__input-name');
const inputClass = moreInfoPopup.querySelector('.popup__input-name_more_heading');
const saveInfoPopupSubmit = moreInfoPopup.querySelector('.popup__button-submit');
const saveInfoPopupForm = moreInfoPopup.querySelector('.popup__container');
const infoName = document.querySelector('.profile__title');
const infoClass = document.querySelector('.profile__subtitle');


  
// первый попап

  changeButton.addEventListener("click", () => {
    openPopup(moreInfoPopup); 
  inputName.value = infoName.textContent; 
  inputClass.value = infoClass.textContent; 
});

 moreInfoClose.addEventListener("click", closeFormSubmit);
 function closeFormSubmit () {
 moreInfoPopup.classList.remove("popup_opened");
};

saveInfoPopupForm.addEventListener("submit", saveFormSubmit);
function saveFormSubmit (event) {
  event.preventDefault();
  infoName.textContent = inputName.value;
  infoClass.textContent = inputClass.value;
  closePopup(moreInfoPopup);
};



// создание карточек с фото


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const templateCard = document.getElementById('images-card'); 
const imageGrid = document.querySelector('.elements');

const createImageElement = (imageData) => {
const imageElement = templateCard.content
  .querySelector(".element")
  .cloneNode(true);
const imageName = imageElement.querySelector(".element__title");
const myImage = imageElement.querySelector(".element__image");

imageName.innerHTML = imageData.name;
myImage.src = imageData.link;
myImage.alt = imageData.name;

const likeButton = imageElement.querySelector('.element__icon');
const deleteButton = imageElement.querySelector('.element__delete');

const handleLike = () => {
  likeButton.classList.toggle('element__icon_active')
};

const handleButton = () => {
  imageElement.remove();
};

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

const addButtonItem = document.querySelector(".profile__button-add");
const moreInfoPopupItem = document.querySelector(".popup_type_more-item");
const infoNameItem = document.querySelector(".element__title");
const infoLinkItem = document.querySelector(".element__image");
const inputItem = document.querySelector(".popup__input-name_item");
const inputLinkItem = document.querySelector(".popup__input-name_more_link");
const saveInfoPopupFormItem = document.querySelector(".popup__container_item");
const moreInfoCloseItem = document.querySelector(".popup__close_item");

const openPopup = (popup) => {
popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
popup.classList.remove("popup_opened");
};

addButtonItem.addEventListener("click", () => {
openPopup(addButtonItem);
moreInfoPopupItem.classList.add("popup_opened");
});

moreInfoCloseItem.addEventListener("click", () => {
closePopup(moreInfoCloseItem);
moreInfoPopupItem.classList.remove("popup_opened");
});

const saveFormSubmitImage = (evt) => {
evt.preventDefault();

const nameInput = saveInfoPopupFormItem.querySelector(
  ".popup__input-name_item"
);
const linkInput = saveInfoPopupFormItem.querySelector(
  ".popup__input-name_more_link"
);

const name = nameInput.value;
const link = linkInput.value;

const imageData = {
  name,
  link,
};

renderImageElement(createImageElement(imageData));
closePopup(moreInfoPopupItem);
};

saveInfoPopupFormItem.addEventListener("submit", saveFormSubmitImage);


//popup 3 который должен открывать картинку 

const template = document.getElementById('images-card');
const popupImage = document.querySelector('.popup__container-image');
const popupMoreImage = document.querySelector('.popup_type_more_image');
const popupTitleImage = popupMoreImage.querySelector('.popup__title-image');
const buttonAddImage = document.querySelector('.buttonAddImage');

const createCardImage = (data) => {  
const htmlElement = template.content.querySelector('.element').cloneNode(true);

const imageName = htmlElement.querySelector('.element__title');
const imageOpenPopup = htmlElement.querySelector('.element__image');

  imageName.textContent = data.name;
  imageOpenPopup.src = data.link;
}
 
const renderImageElementPopup = (htmlElement) => {
  popupImage.prepend(htmlElement);
};

buttonAddImage.addEventListener('click', () => {
  openPopup(popupMoreImage);
});

const handleEditImage = (evt) => {
  evt.preventDefault();
  popupImage.querySelector('element__image').src = data.link;
  popupTitleImage.querySelector('element__title').textContent = data.name;

  const imageData = {name, link};  // name почему-то устарело!
}

// renderImageElementPopup(createCardImage(data));
// imageElement.querySelector('element__image').addEventListener('click', () => openPopup());

  //   const buttonAddImage = document.querySelector('.buttonAddImage');
  //   const popupMoreImage = document.querySelector('.popup_type_more_image');
  //   const popupImage = popupMoreImage.querySelector('.popup__container-image');
  //   const popupTitleImage = popupMoreImage.querySelector('.popup__title-image');

  //   buttonAddImage.addEventListener('click', () => {
  //     openPopup(popupMoreImage)
    
  //     popupImage.querySelector('element__image').src = data.link;
  //     popupTitleImage.querySelector('element__title').textContent = data.name
  //     popupMoreImage.classList.add('popup_opened')

  // });















// const createCardImage = (data) => {
//     const imgHtmlElement = template.cloneNode(true)
  
//     imgHtmlElement.querySelector('element__image').src = data.link;
//     imgHtmlElement.querySelector('element__title').textContent = data.name;
  
//}
    // const buttonAddImage = document.querySelector('.buttonAddImage');
    // const popupMoreImage = document.querySelector('.popup_type_more_image');
    // const popupImage = popupMoreImage.querySelector('.popup__container-image');
    // const popupTitleImage = popupMoreImage.querySelector('.popup__title-image');
  
    
  //   buttonAddImage.addEventListener('click', () => {
  //     openPopup(popupMoreImage)

  //     popupMoreImage.src = data.link;
  //     popupMoreImage.textContent = data.name
  //     popupMoreImage.querySelector('element__image').src = data.link;
  //     popupMoreImage.querySelector('element__title').textContent = data.name
  //     popupMoreImage.classList.add('popup_opened')

      
  
  // });
  
  //}