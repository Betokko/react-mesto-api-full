import React from "react";
import closeIcon from '../../images/close-Icon.png'

function ImagePopup(props) {

  if (props.card !== null) {
    return (
      <div className={`popup popup_img popup_enabled`}>
        <div className="popup__image-container">
          <img className="popup__close-btn popup__close-btn_img" src={closeIcon}
            alt="кнопка закрыть" onClick={props.onClose} />
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <p className="popup__image-descr">{props.card.name}</p>
        </div>
      </div>
    )
  }
}
export default ImagePopup