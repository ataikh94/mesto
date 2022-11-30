/* Объявление переменных */
let openPopup = document.querySelector('.info__edit-button');
let closePopup = document.querySelector('.popup__close-button');
let popUp = document.querySelector('.popup');
let profileName = document.querySelector('.info__name');
let profileText = document.querySelector('.info__text');
let editForm = document.querySelector('.popup__form');
let popupName = editForm.querySelector('.popup__input_name');
let popupText = editForm.querySelector('.popup__input_text');


/* Функция открытия модального окна */
function popupOpened() {
    popUp.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupText.value = profileText.textContent;
}

/* Функция закрытия модального окна */
function popupClosed() {
    popUp.classList.remove('popup_opened');
}

/* Функция сохранения информации */
function popapSave(e) {
    e.preventDefault();
    profileName.textContent = popupName.value;
    profileText.textContent = popupText.value;
    popupClosed();
}

/* События */
openPopup.addEventListener('click', popupOpened);
closePopup.addEventListener('click', popupClosed);
editForm.addEventListener('submit', popapSave);

/* popUp.addEventListener('click', function (closePopup) {
    if (closePopup.target === closePopup.currentTarget) {
        popupClosed();
    }
}) */