  const formSubmitButtonChangeState = (form) => {
    const button = form.querySelector(".popup__button-submit");
    if (!form.checkValidity()) {
      button.setAttribute("disabled", true);
      button.classList.add("popup__button-submit_add");
    } else {
      button.removeAttribute("disabled");
      button.classList.remove("popup__button-submit_add");
    }
  };

  const getErrorElement = (input) => {
    return document.querySelector(`#error-${input.id}`);
  };

  const hideError = (input) => {
    const errorElement = getErrorElement(input);
    errorElement.textContent = "";
  };

  const showError = (input) => {
    const errorElement = getErrorElement(input);
    errorElement.textContent = input.validationMessage;
  };

  const validateInput = (input) => {
    if (!input.validity.valid) {
      showError(input);
    } else {
      hideError(input);
    }
  };

  const validateInputEvent = (evt) => {
    const input = evt.target;
    const form = evt.currentTarget;
    validateInput(input);
    formSubmitButtonChangeState(form);
  };

  document.querySelectorAll(".form").forEach((popupForm) => {
    popupForm.addEventListener("input", validateInputEvent, true);
  });
  
