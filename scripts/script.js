let openPopup = document.querySelector('.info__edit-button');
let closePopup = document.querySelector('.popup__close-button');
let popUp = document.querySelector('.popup');
let profileName = document.querySelector('.info__name');
let profileText = document.querySelector('.info__text');
let popupName = document.querySelector('.popup__name');
let popupText = document.querySelector('.popup__text');
let popupSave = document.querySelector('.popup__save-button');

function popupOpened() {
    popUp.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupText.value = profileText.textContent;
}

function popupClosed() {
    popUp.classList.remove('popup_opened');
}

function popapSave(e) {
    e.preventDefault();
    profileName.textContent = popupName.value;
    profileText.textContent = popupText.value;
    popupClosed();
}

openPopup.addEventListener('click', popupOpened);
closePopup.addEventListener('click', popupClosed);
popupSave.addEventListener('click', popapSave);

popUp.addEventListener('click', function (closePopup) {
    if (closePopup.target === closePopup.currentTarget) {
        popupClosed();
    }
})