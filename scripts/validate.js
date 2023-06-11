const disableSubmitButton = () => {
    const buttonInputElement = document.getElementById('buttonInputItem');
    buttonInputElement.setAttribute("disabled", true);
    buttonInputElement.classList.add(config.inactiveButtonClass);  
};

const deleteErrorElement = () => {
  const formInputError = document.querySelectorAll(config.inputErrorClass);
  formInputError.forEach((elem) => {
    elem.textContent = '';
  });
};

const formSubmitButtonChangeState = (form) => {
  const button = form.querySelector(config.submitButtonSelector);
  if (!form.checkValidity()) {
    button.setAttribute("disabled", true);
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.removeAttribute("disabled");
    button.classList.remove(config.inactiveButtonClass);
  }
};

const getErrorElement = (input) => {
  return document.querySelector(`#error-${input.id}`);
};

const hideError = (input, config) => {
  const errorElement = getErrorElement(input, config);
  errorElement.textContent = "";
};

const showError = (input, config) => {
  const errorElement = getErrorElement(input, config);
  errorElement.textContent = input.validationMessage;
};

const validateInput = (input, config) => {
  if (!input.validity.valid) {
    showError(input, config);
  } else {
    hideError(input, config);
  }
};

const validateInputEvent = (evt) => {
  const input = evt.target;
  const form = evt.currentTarget;
  validateInput(input);
  formSubmitButtonChangeState(form);
};

const enableValidation = (config) => {
  document.querySelectorAll(config.formSelector).forEach((popupForm) => {
    popupForm.addEventListener("input", validateInputEvent, true);
  });
};

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".popup__button-submit",
    inactiveButtonClass: "popup__button-submit_add",
    inputErrorClass: "form__input-error",
    errorClass: "popup__error_visible"
});


































// enableValidation({
//   formSelector: ".form",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".popup__button-submit",
//   inactiveButtonClass: "popup__button-submit_add",
//   inputErrorClass: "form__input-error",
//   errorClass: "error-message_visible",
// });

// // const enableValidation = () => {
// // document.querySelectorAll('.form').forEach((popupForm) => {
// //   popupForm.addEventListener('input', validateInputEvent, true);
// // });
// // };
// document.querySelectorAll('.form').forEach((popupForm) => {
//     popupForm.addEventListener('input', validateInputEvent, true);
// });
// enableValidation();

//enableValidation({
//     formSelector: '.form',
//     inputSelector: '.form__input',
//     submitButtonSelector: '.popup__button-submit',
//     inactiveButtonClass: 'popup__button-submit_add',
//     inputErrorClass: 'form__input-error',
//     errorClass: 'error-message_visible'
//});

// const deleteErrorElement = () => {
//     const formInputError = document.querySelectorAll('.form__input-error');
//       formInputError.forEach((elem) => {
//         elem.textContent = '';
//       });
//      };

// const formSubmitButtonChangeState = (form) => {
//   const button = form.querySelector('.popup__button-submit');
//   if (!form.checkValidity()) {
//     button.setAttribute("disabled", true);
//     button.classList.add('popup__button-submit_add');
//   } else {
//     button.removeAttribute("disabled");
//     button.classList.remove('popup__button-submit_add');
//   }
// };

// const getErrorElement = (input) => {
//   return document.querySelector(`#error-${input.id}`);
// };

// const hideError = (input) => {
//   const errorElement = getErrorElement(input);
//   errorElement.textContent = '';
// };

// const showError = (input) => {
//   const errorElement = getErrorElement(input);
//   errorElement.textContent = input.validationMessage;
// };

// const validateInput = (input) => {
//   if (!input.validity.valid) {
//     showError(input);
//   } else {
//     hideError(input);
//   }
// };

// const validateInputEvent = (evt) => {
//   const input = evt.target;
//   const form = evt.currentTarget;
//   validateInput(input);
//   formSubmitButtonChangeState(form);
// };

// document.querySelectorAll('.form').forEach((popupForm) => {
//   popupForm.addEventListener('input', validateInputEvent, true);
// });
