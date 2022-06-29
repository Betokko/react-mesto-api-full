import React, { useContext } from "react";
import removeIcon from '../../images/remove-icon.png'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Card(props) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`insert-card__remove ${isOwn ? '' : 'insert-card__remove_hidden'}`);

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `insert-card__icon  ${isLiked ? 'insert-card__icon_active' : ''}`

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
  return (
    <li className="insert-card__item">
      <img className="insert-card__img" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <img className={cardDeleteButtonClassName} src={removeIcon} alt="Корзина" onClick={handleDeleteClick}/>
      <div className="insert-card__info">
        <h2 className="insert-card__title">{props.card.name}</h2>
        <div>
          <div className={cardLikeButtonClassName} alt="иконка" onClick={handleLikeClick}></div>
          <div className="insert-card__counter">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}
export default Card;
