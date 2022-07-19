import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profileOpenBtn = document.querySelector(".profile__button");
const btnAddCard = document.querySelector(".profile__add-button");
const page = document.querySelector(".page");

const closeButtons = document.querySelectorAll(".popup__close-icon");
const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__image-title");
const profileForm = document.querySelector(".profile-form");
const cardForm = document.querySelector(".card-form");
const profilePopup = document.querySelector(".profile-popup");
const cardPopup = document.querySelector(".card-popup");
const imagePopup = document.querySelector(".image-popup");

const nameInput = document.querySelector(".popup__field_type_name");
const jobInput = document.querySelector(".popup__field_type_job"); // Назначаю переменную и вибираю откуда
const userName = document.querySelector(".profile__title"); // Назначаю переменную userName и job
const job = document.querySelector(".profile__subtitle");

const config = {
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

const initialCards = [
  {
    name: "По мосту?",
    link: "https://images.unsplash.com/photo-1647883635719-8debb528c5fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHR1cmtleSUyMGJyaWRnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Погружаемся?",
    link: "https://images.unsplash.com/photo-1596814499955-ca23f3679fe9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzN8fHR1cmtleSUyMGRlcnZpc2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "На живца?",
    link: "https://images.unsplash.com/photo-1634110985794-433ae37c34e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM1fHxpc3RhbmJ1bCUyMGJyaWRnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Пройдёмся?",
    link: "https://images.unsplash.com/photo-1606580523068-a0a7918c6a24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fGlzdGFuYnVsJTIwYnJpZGdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "На шопинг?",
    link: "https://images.unsplash.com/photo-1629212094410-e5bd12fe49c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGlzdGFuYnVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Мясца?",
    link: "https://images.unsplash.com/photo-1596995804697-27d11d43652e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGZvb2QlMjBrZWJhYnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
];

class CardList {
  constructor(container, items, template, onCardClick) {
    this._container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;
    this._items = items;
    this._template = template;
    this._onCardClick = onCardClick;
  }

  init() {
    this._items.forEach((item) => {
      this._createCard(item);
    });
  }

  _deleteCard(cardElement) {
    cardElement.remove();
  }

  _createCard(item, isAppend = true) {
    const card = new Card(item, this._template, this._onCardClick);
    const cardElement = card.generate();

    cardElement
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._deleteCard(cardElement);
      });

    isAppend
      ? this._container.append(cardElement)
      : this._container.prepend(cardElement);
  }

  add(name, link) {
    this._createCard({ name, link }, false);
  }
}

const cardList = new CardList(
  ".elements",
  initialCards,
  "#image",
  handleCardClick
);
cardList.init();

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  cardList.add(
    cardPopup.querySelector("#title").value,
    cardPopup.querySelector("#url").value
  );

  closePopup(cardPopup);

  e.target.reset();
});

new FormValidator(config, profileForm).enableValidation();
new FormValidator(config, cardForm).enableValidation();

//ОТКРЫТИЕ--------------------------------------------------------------------------------------
function openPopup(popup) {
  // создаём функцию открытия попапа
  popup.classList.add("popup_opened");
  page.addEventListener("keyup", closePopupPushEsc);
}

profileOpenBtn.addEventListener("click", function (event) {
  //Открывает первый попап
  nameInput.value = userName.textContent; // Говорю, что значение nameInput and jobInput = тому, что вптсано в title and subtitle
  jobInput.value = job.textContent; // Создаю функцию, которая добавляет модификатор и включает popup
  openPopup(profilePopup); //функция открыть (здесь имя первого попапа )
});

btnAddCard.addEventListener("click", function () {
  openPopup(cardPopup);
});

//ПРОСМОТР ОПЕРЕДЕЛЁННОЙ КАРТОЧКИ--------------------------------------------------------------------------------------

function handleCardClick(link, name) {
  openPopup(imagePopup);

  popupTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
}

//ЗАКРЫТИЕ--------------------------------------------------------------------------------------

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  page.removeEventListener("keyup", closePopupPushEsc);
}

closeButtons.forEach((button) => {
  //закрытие для всех крестиков
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

function closePopupPushEsc(evt) {
  // при нажатии на esc popup закрывается
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

popups.forEach((click) => {
  click.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(evt.target);
    }
  });
});

// ИЗМЕНЕНИЕ ИНФЫ О СЕБЕ--------------------------------------------------------------------------------------

function handleProfileFormSubmit(evt) {
  // Создаю фукнцию для изменения инфы о себе
  evt.preventDefault();

  userName.textContent = nameInput.value; // Выберите элементы, куда должны быть вставлены значения полей
  job.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
  closePopup(profilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit); // Прикрепляем обработчик к форме:// он будет следить за событием “submit” - «отправка»
