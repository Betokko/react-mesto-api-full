import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ linkName, handleLinkName, handleLinkUrl, onRegister }) {
  if (document.location.pathname === "/sign-up") {
    handleLinkName(linkName);
    handleLinkUrl("/sign-in");
  }

  const [userData, setuserData] = useState({ password: "", email: "" });

  function handleSumbit(evt) {
    evt.preventDefault();
    onRegister(userData);
  }

  return (
    <div className="login">
      <h1 className="login__header">Регистрация</h1>
      <input
        value={userData.email}
        onChange={(e) => setuserData({ ...userData, email: e.target.value })}
        placeholder="Email"
        type="email"
        className="login__input login__input_email"
      />
      <input
        value={userData.password}
        onChange={(e) => setuserData({ ...userData, password: e.target.value })}
        placeholder="Пароль"
        type="password"
        className="login__input login__input_password"
      />
      <button className="login__button" onClick={handleSumbit}>
        Зарегистрироваться
      </button>
      <Link className="link" exact to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
