const BASE_URL = "https://auth.nomoreparties.co";

const checkResponse = (res) => {
  if (res.status === 200) {
    return res.json();
  }
  return res.json().then((res) => {
    throw res;
  });
};

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse)
};

export const login = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const checkValidityToken = (JWT) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  }).then(checkResponse);
};
