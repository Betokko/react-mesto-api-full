import "./Login.css";
import { useState } from "react";

function Login({ linkName, handleLinkName, handleLinkUrl, onLogin }) {
  const [userData, setuserData] = useState({ password: "", email: "" });

  if (document.location.pathname === "/sign-in") {
    handleLinkName(linkName);
    handleLinkUrl("/sign-up");
  }

  function handleSumbit(evt) {
    evt.preventDefault();
    onLogin(userData);
  }

  return (
    <div className="login">
      <h1 className="login__header">Вход</h1>
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
        Войти
      </button>
    </div>
  );
}

export default Login;
