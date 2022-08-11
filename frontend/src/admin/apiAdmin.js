import { API } from "../config";

 //API method for new category
export const createCategory = (userid,token,category) => {

  return fetch(`${API}/category/create/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`,
    },
    
    body: JSON.stringify(category),
  }).then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const createProduct = (userid,token,product) => {

  return fetch(`${API}/product/create/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization:`Bearer ${token}`,
    },
    
    body: Jproduct,
  }).then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

