import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import api from "../../utils/API";
import * as auth from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import "./App.css";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [tooltipPopupStatus, setTooltipPopupStatus] = useState(false);
  const [tooltipPopupMessage, setTooltipPopupMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  function getProfileInfo() {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser({
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
          name: res.name,
        });
      })
      .catch((err) => console.log(err));
  }

  function getInitialCards() {
    api
      .getInitialCards()
      .then((res) => {
        setCards([...cards].concat(res));
      })
      .catch((err) => console.log(err));
  }

  // cards
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id !== card._id ? c : "")));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .loadCard(newCard)
      .then(() => {
        newCard._id = currentUser._id;
        newCard.owner = currentUser;
      })
      .then(() => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }
  // /cards

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }
  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setProfileInfo(name, about)
      .then((res) =>
        setCurrentUser({
          name: name,
          about: about,
          avatar: res.avatar,
          _id: res._id,
        })
      )
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((res) =>
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: avatar,
          _id: res._id,
        })
      )
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  // Routing
  function handleLinkName(name) {
    setLinkName(name);
  }
  function handleLinkUrl(url) {
    setLinkUrl(url);
  }

  // Auth
  function handleLoggedIn() {
    setLoggedIn(!loggedIn);
  }

  function checkToken() {
    const JWT = localStorage.getItem("JWT");
    if (JWT) {
      auth
        .checkValidityToken(JWT)
        .then((res) => {
          setLoggedIn(true);
          history.push("/");
          setUserData({ _id: res.data._id, email: res.data.email });
          getProfileInfo();
          getInitialCards();
        })
        .catch((err) => console.log(err));
    }
  }

  function handleRegister(userData) {
    auth
      .register(userData)
      .then(() => {
        setIsTooltipPopupOpen(true);
        setTooltipPopupStatus(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsTooltipPopupOpen(true);
        setTooltipPopupStatus(false);
        setTooltipPopupMessage(err[Object.keys(err)[0]]);
      });
  }

  function handleLogin(userData) {
    auth
      .login(userData)
      .then((res) => {
        localStorage.setItem("JWT", res.token);
        setLoggedIn(true);
        history.push("/");
        setIsTooltipPopupOpen(true);
        setTooltipPopupStatus(true);
        setTooltipPopupMessage("Авторизация прошла успешно!");
        checkToken();
      })
      .catch((err) => {
        setIsTooltipPopupOpen(true);
        setTooltipPopupStatus(false);
        setTooltipPopupMessage(err[Object.keys(err)[0]]);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <InfoTooltip
          isTooltipPopupOpen={isTooltipPopupOpen}
          tooltipPopupStatus={tooltipPopupStatus}
          tooltipPopupMessage={tooltipPopupMessage}
          onClose={closeAllPopups}
        />
        <Header
          name={linkName}
          url={linkUrl}
          userData={userData}
          loggedIn={loggedIn}
          onLoggedIn={handleLoggedIn}
        />
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} exact path="/">
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDeleteCard={handleDeleteCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login
              linkName="Регистрация"
              handleLinkName={handleLinkName}
              handleLinkUrl={handleLinkUrl}
              onLogin={handleLogin}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              linkName="Войти"
              handleLinkName={handleLinkName}
              handleLinkUrl={handleLinkUrl}
              onRegister={handleRegister}
            />
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="remove-card"
          title="Вы уверены?"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
