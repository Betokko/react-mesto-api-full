import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            required
            id="profile-text-name"
            type="text"
            name="name"
            className="popup__input popup__text-input popup__name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={name || ""}
            onChange={handleNameChange}
          />
          <span className="profile-text-name-error popup__error"></span>

          <input
            required
            id="profile-text-descr"
            type="text"
            name="descr"
            className="popup__input popup__text-input popup__descr"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            value={description || ""}
            onChange={handleDescriptionChange}
          />
          <span className="popup__error profile-text-descr-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
