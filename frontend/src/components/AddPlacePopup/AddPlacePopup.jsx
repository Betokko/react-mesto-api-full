import { useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {

  const inputName = useRef(null)
  const inputLink = useRef(null)

  useEffect(() => {
    inputName.current.value = ''
    inputLink.current.value = ''
  }, [props.isOpen])

  function handleSubmit(evt) {
    let name = inputName.current.value;
    let link = inputLink.current.value;
    evt.preventDefault()
    props.onAddPlace({ name, link })
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            ref={inputName}
            id="card-text-name"
            type="text"
            name="name"
            className="popup__input popup__text-input popup__name popup__card-name"
            defaultValue=""
            placeholder="Название"
            required
            minLength="2"
            maxLength="30" />
          <span className="popup__error card-text-name-error"></span>

          <input
            ref={inputLink}
            id="card-url-descr"
            type="url"
            name="descr"
            className="popup__input popup__text-input popup__descr popup__card-descr"
            defaultValue=""
            placeholder="Ссылка на картинку"
            required />
          <span className="popup__error card-url-descr-error"></span>
        </>
      }
    />
  )
}

export default AddPlacePopup;