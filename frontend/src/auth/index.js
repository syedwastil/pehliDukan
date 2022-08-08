import { API } from "../config";

 //API method for signup
export const signupin = (user,method) => {
  //console.log(process.env.REACT_APP_API_URL);
  //console.log(API);
  console.log(JSON.stringify(user));
  return fetch(`${API}/${method}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};