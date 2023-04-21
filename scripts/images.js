

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
console.log(templateCard);



//popup 2

const addButtonItem = document.querySelector(".profile__button-add");
const moreInfoPopupItem = document.querySelector(".popup_type_more-item");
const infoNameItem = document.querySelector(".element__title");
const infoLinkItem = document.querySelector(".element__image");
const inputItem = document.querySelector(".popup__input-name_item");
const inputLinkItem = document.querySelector(".popup__input-name_more_link");
const saveInfoPopupFormItem = document.querySelector(".popup__container_item");
const moreInfoCloseItem = document.querySelector(".popup__close_item");

// addButtonItem.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   moreInfoPopupItem.classList.add("popup_opened");
// });


const openPopup = (popup) => {     //сделал общую функцию для открытия попапа
    popup.classList.add("popup_opened");
};

const closePopup = (popup) => {     // и для закрытия
    popup.classList.remove("popup_opened");
};

addButtonItem.addEventListener("click", () => {
  openPopup(addButtonItem);
  moreInfoPopupItem.classList.add("popup_opened");
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

saveInfoPopupFormItem.addEventListener("submit", saveFormSubmitImage,);



// saveInfoPopupFormItem.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   imageName.textContent = inputItem.value;

//   saveFormSubmitItem();
// });


