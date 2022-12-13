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
let openPopup = document.querySelector('.info__edit-button');
let addCardBtn = document.querySelector('.profile__add-button');
let closePopup = document.querySelectorAll('.popup__close-button');
const popUp = document.querySelector('#popupEditProfile');
const popupAddCard = document.querySelector('#popupAddCard');
let popUps = document.querySelectorAll('.popup');
let profileName = document.querySelector('.info__name');
let profileText = document.querySelector('.info__text');
let editForm = document.querySelector('.popup__form');
let popupName = editForm.querySelector('.popup__input_type_name');
let popupText = editForm.querySelector('.popup__input_type_text');

const inputName = document.querySelector('.popup__input_type_title');
const inputDesc = document.querySelector('.popup__input_type_link');

/* Отображение карточек из коробки*/
//1. Определим переменную, куда будут добавлены элементы
const cardContainer = document.querySelector('.card__list');

//2. Создадим функцию, которая будет добавлять элементы на страницу
function createCard(name, link) {

  //Найдём template, который будем клонировать
  const template = document.querySelector('#card-template');

  //Клонируем кусочек шаблона card в tempate
  const card = template.content.querySelector('.element').cloneNode(true);
  const buttonLike = card.querySelector('.element__button-like');
  const buttonDelete = card.querySelector('.element__button-delete');

  const modal = document.querySelector('#popupImage');
  const cardLink = modal.querySelector('.popup__image');
  const cardText = modal.querySelector('.popup__text');
  const cardImage = card.querySelector('.element__image');

  //Зададим содержимое элементам контейнера значения
  card.querySelector('.element__desc').textContent = name;
  card.querySelector('.element__image').src = link;
  card.querySelector('.element__image').alt = name;

  buttonLike.addEventListener('click', () => btnLike(buttonLike));
  buttonDelete.addEventListener('click', () => btnDelete(buttonDelete));

  cardImage.addEventListener('click', function() {
    modal.classList.add('popup_opened');
    cardLink.src = cardImage.src;
    cardText.textContent = name;
    cardLink.alt = name;
  });
  return card;
};

//3. Создадим функцию, которая будет отрисовывать карточки на странице
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
  renderCards(name, link);
  closesPopup(popupAddCard);
  inputName.value = '';
  inputDesc.value = '';
}

const form = document.querySelector('.popup_form_addCard');
form.addEventListener('submit', addCard);


/* Функция открытия модального окна редактирования профиля*/
function openedPopup() {
  popUp.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupText.value = profileText.textContent;
}

/*Функция открытия модального окна для добавления информации*/
function addedPopup() {
  popupAddCard.classList.add('popup_opened');
}
addCardBtn.addEventListener('click', addedPopup);

/* Функция закрытия модальных окон */
closePopup.forEach(button => {
  button.addEventListener('click', function (e) {
    for (let i = 0; i < popUps.length; i++) {
      popUps[i].classList.remove('popup_opened');
    }
  });
});

/* Функция сохранения информации в окне редактирования профиля */
function savedPopup(e) {
  e.preventDefault();
  profileName.textContent = popupName.value;
  profileText.textContent = popupText.value;
  popUp.classList.remove('popup_opened');
}

/* События */
openPopup.addEventListener('click', openedPopup);
editForm.addEventListener('submit', savedPopup);

function closesPopup(popup){
  popup.classList.remove('popup_opened');
}

function btnLike(like) {
  like.classList.toggle('element__button-like_active');
};

function btnDelete(deleted) {
  const elem = deleted.closest('.element');
  elem.remove();
};