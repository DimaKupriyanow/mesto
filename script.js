const changeButton = document.querySelector('.profile__button-change');
const moreInfoPopup = document.querySelector('.popup_type_more-info');
const moreInfoClose = moreInfoPopup.querySelector('.popup__close');
const inputName = moreInfoPopup.querySelector('.popup__input-name');
const inputClass = moreInfoPopup.querySelector('.popup__input-class');
const saveInfoPopupSubmit = moreInfoPopup.querySelector('.popup__button-submit');
const saveInfoPopupForm = moreInfoPopup.querySelector('.popup__container');
const infoName = document.querySelector('.profile__title');
const infoClass = document.querySelector('.profile__subtitle');


changeButton.addEventListener("click", () => {
  moreInfoPopup.classList.add("popup_opened");
  inputName.value = infoName.textContent;
  inputClass.value = infoClass.textContent;
});

moreInfoClose.addEventListener("click", () => {
  moreInfoPopup.classList.remove("popup_opened");
  inputName.value = infoName.textContent;
  inputClass.value = infoClass.textContent;
});

saveInfoPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  infoName.textContent = inputName.value;

  infoClass.textContent = inputClass.value;

  moreInfoPopup.classList.remove("popup_opened");
});
  








