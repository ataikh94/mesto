const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
};

function validateInput(form, input, config) {
    const error = form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
        input.classList.add(config.inputErrorClass);
        error.classList.add(config.errorClass);
        error.textContent = input.validationMessage;
    } else {
        input.classList.remove(config.inputErrorClass);
        error.classList.remove(config.errorClass);
        error.textContent = '';
    }
};

function setButtonState(inputs, button, config) {
    const hasErrors = inputs.some(input => !input.validity.valid)
    if (hasErrors) {
        button.classList.add(config.inactiveButtonClass);
        button.classList.remove(config.activeButtonClass);
        button.setAttribute('disabled', true);
    } else {
        button.classList.remove(config.inactiveButtonClass);
        button.classList.add(config.activeButtonClass);
        button.removeAttribute('disabled');
    }
}

function validateForm(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            validateInput(form, input, config);
            setButtonState(inputs, button, config);
        })
    })
};

function validation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        validateForm(form, config);
    })
};

validation(enableValidation);


