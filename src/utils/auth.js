import { checkRes } from "./api";
import { baseUrl } from "./constants";

//  signup for user registration
const registerUser = (userData) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.name,
      avatar: userData.avatar,
      email: userData.email,
      password: userData.password,
    }),
  }).then(checkRes);
};

// signin for user authorization
const loginUser = (userData) => {
  // const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // removed authorization header because user not yet authenticated at this point. Use authorization header for requests that require authentication, like verifying a token or accessing protected resources
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
    }),
  }).then(checkRes);
};

const verifyToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

export { registerUser, loginUser, verifyToken };
