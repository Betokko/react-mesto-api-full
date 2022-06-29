import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import editButton from "../../images/edit-btn.svg";
import Card from "../Card/Card";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__edit-icon"></div>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Изображение профиля"
            onClick={props.onEditAvatar}
          />
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <img
                src={editButton}
                alt="иконка редактировать"
                className="profile__edit-button"
                onClick={props.onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <div className="profile__add-button" onClick={props.onAddPlace}></div>
        </section>
        <section>
          <ul className="insert-card">
            {props.cards.map((item) => (
              <Card
                card={item}
                key={item._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
