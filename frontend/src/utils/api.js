import { baseUrl, checkError, headers } from "./utils";

export const login = (user) => {
  return fetch(`${baseUrl}signin`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(user),
  }).then(checkError);
};

export const logout = () => {
  return fetch(`${baseUrl}logout`, {
    headers: headers,
    credentials: "include",
  }).then(checkError);
};

export const getUserInfo = () => {
  return fetch(`${baseUrl}users/me`, {
    headers: headers,
    credentials: "include",
  }).then(checkError);
};
