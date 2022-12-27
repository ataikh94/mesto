'use strict';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
/* Объявление переменных */
const btnEditProfile = document.querySelector('.info__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const btnclosePopups = document.querySelectorAll('.popup__close-button');
const popUp = document.querySelector('#popupEditProfile');
const popupAddCard = document.querySelector('#popupAddCard');
const popUps = document.querySelectorAll('.popup');
const profileName = document.querySelector('.info__name');
const profileText = document.querySelector('.info__text');
const popupEditForm = document.querySelector('.popup__form');
const popupName = popupEditForm.querySelector('.popup__input_type_name');
const popupText = popupEditForm.querySelector('.popup__input_type_text');
const inputName = document.querySelector('.popup__input_type_title');
const inputDesc = document.querySelector('.popup__input_type_link');
const formAddCard = document.querySelector('.popup__form-addCard');
const formAddCardInputLists = formAddCard.querySelectorAll('.popup__input');
const formAddCardSaveButton = formAddCard.querySelector(validationList.submitButtonSelector);
const cardContainer = document.querySelector('.card-list');
const template = document.querySelector('#card-template');
const modal = document.querySelector('#popupImage');
const cardLink = modal.querySelector('.popup__image');
const cardText = modal.querySelector('.popup__text');

/* ОТОБРАЖЕНИЕ КАРТОЧЕК ИЗ КОРОБКИ */
/*Функция создания карточек*/
function createCard(name, link) {
  const card = template.content.querySelector('.element').cloneNode(true);
  const buttonLike = card.querySelector('.element__button-like');
  const buttonDelete = card.querySelector('.element__button-delete');
  const cardImage = card.querySelector('.element__image');

  card.querySelector('.element__desc').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  buttonLike.addEventListener('click', () => btnLike(buttonLike));
  buttonDelete.addEventListener('click', () => btnDelete(buttonDelete));
  cardImage.addEventListener('click', function () {
    openedPopup(modal);
    cardLink.src = cardImage.src;
    cardText.textContent = name;
    cardLink.alt = name;
  });
  return card;
};
/*Функция отрисовки карточек на странице*/
function renderCards(name, link) {
  cardContainer.prepend(createCard(name, link));
}

initialCards.forEach(({ name, link }) => {
  renderCards(name, link);
})

const addCard = (event) => {
  event.preventDefault();

  const name = inputName.value;
  const link = inputDesc.value;
  if (name !== '' && link !== '') {
    renderCards(name, link);
    closesPopup(popupAddCard);
    event.target.reset();
    setButtonState(formAddCardInputLists, formAddCardSaveButton, validationList);
  }
}

/* Функция открытия модального окна редактирования профиля*/
function openEditProfilePopup() {
  openedPopup(popUp);
  popupName.value = profileName.textContent;
  popupText.value = profileText.textContent;
}

/*Функция открытия указанного модального окна*/
function openedPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}
/*Функция закрытия указанного модального окна*/
function closesPopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', closePopupEsc);
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}

/*Функция лайка карточки*/
function btnLike(like) {
  like.classList.toggle('element__button-like_active');
};

/*Функция удаления карточки*/
function btnDelete(deleted) {
  const elem = deleted.closest('.element');
  elem.remove();
};

/*Функция открытия модального окна для добавления информации*/
function addedPopup() {
  openedPopup(popupAddCard);
}

/* Функция сохранения информации в окне редактирования профиля */
function savedPopup(e) {
  e.preventDefault();
  profileName.textContent = popupName.value;
  profileText.textContent = popupText.value;
  closesPopup(popUp);
}
/* Функция закрытия модального окна по Esc */
const closePopupEsc = (e) => {
  if (e.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closesPopup(popupOpen);
  }
}

/*События*/
popupEditForm.addEventListener('submit', savedPopup);
formAddCard.addEventListener('submit', addCard);
btnEditProfile.addEventListener('click', openEditProfilePopup);
btnAddCard.addEventListener('click', addedPopup);

/* Закрытие модальных окон */
popUps.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('popup__close-button')) {
      closesPopup(popup);
    }
  })
});
