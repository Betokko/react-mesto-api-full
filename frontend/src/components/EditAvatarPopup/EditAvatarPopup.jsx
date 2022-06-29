import React, { useContext, useEffect, useRef } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const inputElement = useRef(null);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    inputElement.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: inputElement.current.value,
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
            ref={inputElement}
            id="avatar-url-descr"
            type="url"
            name="descr"
            className="popup__input popup__text-input"
            defaultValue=""
            placeholder="Ссылка на картинку"
            value={currentUser.avatar}
            required
          />
          <span className="popup__error avatar-url-descr-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
