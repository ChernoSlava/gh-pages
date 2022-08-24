import "./index.css";

import { Api } from "../components/Api";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { FormValidator } from "../components/FormValidator";

import {
  initialCards,
  profileOpenBtn,
  btnAddCard,
  nameInput,
  jobInput,
  config,
  deletePopupCard,
  avatar,
  handlerSubmitBtn,
} from "../utils/constants";
import { PopupWithConfirmation } from "../components/popupWithConfirmation";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    authorization: "1b4bc79c-4655-4b7c-ab14-ef593343b332",
    "Content-Type": "application/json",
  },
});

const handleCardClick = (link, name) => {
  imagePopup.open(link, name);
};

const createNewCard = (item) => {
  return new Card(item, "#image", handleCardClick).generate();
};

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      return createNewCard(item);
    },
  },
  ".elements"
);

// const confirmPopup = new PopupWithConfirmation(deletePopupCard, api);

const imagePopup = new PopupWithImage({
  popupSelector: ".image-popup",
  imageSelector: ".popup__image",
  titleSelector: ".popup__image-title",
});

const profilePopup = new PopupWithForm({
  popupSelector: ".profile-popup",
  formSelector: ".profile-form",
  formSubmitHandler: ({ name, job }) => {
    handlerSubmitBtn.textContent = "Сохранение...";

    userInfo.setUserInfo({
      name,
      desc: job,
    });

    profilePopup.close();
  },
});

const cardPopup = new PopupWithForm({
  popupSelector: ".card-popup",
  formSelector: ".card-form",
  formSubmitHandler: ({ link, title }) => {
    handlerSubmitBtn.textContent = "Сохранение...";

    const card = createNewCard({ link, name: title });

    section.addItemToTop(card);
    cardPopup.close();
  },
});

const avatarPopup = new PopupWithForm({
  popupSelector: ".avatar-popup",
  formSelector: ".popup__avatar-form",
  formSubmitHandler: (link) => {
    handlerSubmitBtn.textContent = "Сохранение...";

    avatar.src = link;
    avatarPopup.close();
  },
});

const userInfo = new UserInfo({
  selectorName: ".profile__title",
  selectorDesc: ".profile__subtitle",
});

section.renderItems();

imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
avatarPopup.setEventListeners();

const profileFormValidator = new FormValidator(config, profilePopup.form);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardPopup.form);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, avatarPopup.form);
avatarFormValidator.enableValidation();

profileOpenBtn.addEventListener("click", () => {
  const { name, desc } = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = desc;

  profileFormValidator.disableSubmitButton();

  profilePopup.open();
});

btnAddCard.addEventListener("click", () => {
  cardFormValidator.disableSubmitButton();
  cardPopup.open();
});

const btnChangeAvatar = document.querySelector(".profile__avatar-btn");
btnChangeAvatar.addEventListener("click", () => {
  avatarFormValidator.disableSubmitButton();
  avatarPopup.open();
});
