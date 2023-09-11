export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
  }

  _formSubmitButtonChangeState = () => {
    if (!this._form.checkValidity()) {
      this._buttonSubmit.setAttribute("disabled", true);
      this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonSubmit.removeAttribute("disabled");
      this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
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




