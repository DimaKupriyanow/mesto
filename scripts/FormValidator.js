
class FormValidator{
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

      _formSubmitButtonChangeState = (form) => {
        const button = form.querySelector(this._config.submitButtonSelector);
        if (!form.checkValidity()) {
          button.setAttribute("disabled", true);
          button.classList.add(this._config.inactiveButtonClass);
        } else {
          button.removeAttribute("disabled");
          button.classList.remove(this._config.inactiveButtonClass);
        }
      }

      _getErrorElement = (input) => {
        return document.querySelector(`#error-${input.id}`);
      }

      _hideError = (input) => {
        const errorElement = this._getErrorElement(input, this._config);
        errorElement.textContent = "";
      }
      
      _showError = (input) => {
        const errorElement = this._getErrorElement(input, this._config);
        errorElement.textContent = input.validationMessage;
      }

      _validateInput = (input) => {
        if (!input.validity.valid) {
          this._showError(input, this._config);
        } else {
          this._hideError(input, this._config);
        }
      }

      _validateInputEvent = (evt) => {
        const input = evt.target;
        const form = evt.currentTarget;
        this._validateInput(input);
        this._formSubmitButtonChangeState(form);
      }

      enableValidation = () => {
        document.querySelectorAll(this._config.formSelector).forEach((popupForm) => {
          popupForm.addEventListener("input", this._validateInputEvent, true);
        });
      }
}

const formValidator = new FormValidator({
formSelector: ".form",
inputSelector: ".form__input",
submitButtonSelector: ".popup__button-submit",
inactiveButtonClass: "popup__button-submit_add",
inputErrorClass: "form__input-error",
errorClass: "popup__error_visible"
});

formValidator.enableValidation()


