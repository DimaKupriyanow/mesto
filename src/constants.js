

// import arkhyzImage from './images/arkhyz.jpg';
// import chelyabinskImage from './images/chelyabinsk-oblast.jpg';
// import ivanovoImage from './images/ivanovo.jpg';
// import kamchatkaImage from './images/kamchatka.jpg';
// import kholmogorskyImage from './images/kholmogorsky-rayon.jpg';
// import baikalImage from './images/baikal.jpg';

// const arkhyzImage = new URL('./src/arkhyz.jpg', import.meta.url);
// const chelyabinskImage = new URL('./src/chelyabinsk-oblast.jpg', import.meta.url);
// const ivanovoImage = new URL('./src/ivanovo.jpg', import.meta.url);
// const kamchatkaImage = new URL('./src/kamchatka.jpg', import.meta.url);
// const kholmogorskyImage = new URL('./src/kholmogorsky-rayon.jpg', import.meta.url);
// const baikalImage = new URL('./src/baikal.jpg', import.meta.url);


// export const initialCards = [
//   {
//     name: "Архыз",
//     link: arkhyzImage,
//   },
//   {
//     name: "Челябинская область",
//     link: chelyabinskImage,
//   },
//   {
//     name: "Иваново",
//     link: ivanovoImage,
//   },
//   {
//     name: "Камчатка",
//     link: kamchatkaImage,
//   },
//   {
//     name: "Холмогорский район",
//     link: kholmogorskyImage,
//   },
//   {
//     name: "Байкал",
//     link: baikalImage,
//   },
// ];







export const initialCards = [
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


  export const validationConfig = { 
    formSelector: ".form", 
    inputSelector: ".form__input", 
    submitButtonSelector: ".popup__button-submit", 
    inactiveButtonClass: "popup__button-submit_add", 
    inputErrorClass: "form__input-error", 
    errorClass: "popup__error_visible", 
  };

 

