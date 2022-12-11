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

/* Отображение карточек из коробки*/
//1. Определим переменную, куда будут добавлены элементы
const cardContainer = document.querySelector('.card__list');

//2. Создадим функцию, которая будет добавлять элементы на страницу
function createCard(cardElem) {

  //Найдём template, который будем клонировать
  const template = document.querySelector('#card-template');

  //Клонируем кусочек шаблона card в tempate
  const card = template.content.querySelector('.element').cloneNode(true);

  //Зададим содержимое элементам контейнера значения
  card.querySelector('.element__desc').textContent = cardElem.name;
  card.querySelector('.element__image').src = cardElem.link;
  card.querySelector('.element__image').alt = cardElem.name;
  return card;
};

//3. Создадим функцию, которая будет отрисовывать карточки на странице
cardContainer.append(...initialCards.map(createCard));

/* Объявление переменных */
let openPopup = document.querySelector('.info__edit-button');
let addCard = document.querySelector('.profile__add-button');
let closePopup = document.querySelectorAll('.popup__close-button');
let popUp = document.querySelector('.popup');
let popUps = document.querySelectorAll('.popup');
let profileName = document.querySelector('.info__name');
let profileText = document.querySelector('.info__text');
let editForm = document.querySelector('.popup__form');
let popupName = editForm.querySelector('.popup__input_type_name');
let popupText = editForm.querySelector('.popup__input_type_text');
const popupAddCard = document.querySelector('#popupAddCard');

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
addCard.addEventListener('click', addedPopup);

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