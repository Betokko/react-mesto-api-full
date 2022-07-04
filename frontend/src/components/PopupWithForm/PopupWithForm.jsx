import React from 'react';
import closeBtn from '../../images/close-Icon.png'

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_enabled' : ''}`}>
      <form className="popup__form popup__body" noValidate name={props.name} onSubmit={props.onSubmit}>
        <fieldset className="popup__dialog">
          <img className="popup__close-btn" onClick={props.onClose} src={closeBtn}
            alt="кнопка закрыть" />
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" name="submit" className="popup__button">Сохранить</button>
        </fieldset>
      </form>
    </div>
  )
}

export default PopupWithForm