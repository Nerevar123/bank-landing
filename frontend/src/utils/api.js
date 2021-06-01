import { baseUrl, checkError, headers } from "./utils";

export const register = (user) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(user),
  }).then(checkError);
};

export const login = (user) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(user),
  }).then(checkError);
};

export const logout = () => {
  return fetch(`${baseUrl}/logout`, {
    headers: headers,
    credentials: "include",
  }).then(checkError);
};

export const getUserInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: headers,
    credentials: "include",
  }).then(checkError);
};

export const patchDetails = (data) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
  }).then(checkError);
};

export const putAccounts = (data) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PUT",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
  }).then(checkError);
};

export const putLoan = (data) => {
  return fetch(`${baseUrl}/users/me/loan`, {
    method: "PATCH",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
  }).then(checkError);
};
