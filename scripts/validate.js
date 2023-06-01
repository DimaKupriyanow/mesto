const formElement = document.querySelector('.form');
// const formInput = document.querySelectorAll('.form__input');

const validateInput = (input) => {
    if(!input.validity.valid) {
        formElement.classList.add('form__input_type_error')
    }
};

formElement.addEventListener('input', (evt) => {
    const input = evt.target;
});