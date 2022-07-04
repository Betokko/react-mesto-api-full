import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(currentUser.avatar)
  }, [currentUser, props.isOpen]);

  function handleLinkChange(evt) {
    setLink(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: link
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id="avatar-url-descr"
            type="url"
            name="descr"
            className="popup__input popup__text-input"
            placeholder="Ссылка на картинку"
            value={link}
            onChange={(evt) => handleLinkChange(evt)}
            required
          />
          <span className="popup__error avatar-url-descr-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
