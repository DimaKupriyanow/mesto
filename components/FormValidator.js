export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _formSubmitButtonChangeState = () => {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    if (!this._form.checkValidity()) {
      button.setAttribute("disabled", true);
      button.classList.add(this._config.inactiveButtonClass);
    } else {
      button.removeAttribute("disabled");
      button.classList.remove(this._config.inactiveButtonClass);
    }
  };

  _getErrorElement = (input) => {
    return document.querySelector(`#error-${input.id}`);
  };

  _hideError = (input) => {
    const errorElement = this._getErrorElement(input, this._config);
    errorElement.textContent = "";
  };

  _showError = (input) => {
    const errorElement = this._getErrorElement(input, this._config);
    errorElement.textContent = input.validationMessage;
  };

  _validateInput = (input) => {
    if (!input.validity.valid) {
      this._showError(input, this._config);
    } else {
      this._hideError(input, this._config);
    }
  };

  _validateInputEvent = (evt) => {
    const input = evt.target;
    const form = evt.currentTarget;
    this._validateInput(input);
    this._formSubmitButtonChangeState();
  };

   enableValidation = () => {
    this._form.addEventListener("input", this._validateInputEvent, true);
  };
}




