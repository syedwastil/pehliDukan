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

export const authenticate=(data,next)=>{
  if(typeof(window)!=='undefined'){
    localStorage.setItem('jwt',JSON.stringify(data))
    next()

  }
}

export const signout=(next)=>{
  if(typeof(window)!=='undefined'){
    localStorage.removeItem('jwt')
    next();
    return fetch(`${API}/signout`,{
      method:'GET',
    }).then(response=>{
      console.log('signout',response)
    }).catch(err=>{
      console.log(err)
    })

  }
}

export const isAuthenticated=()=>{
  if(typeof(window)=='undefined'){
    return false;
  }

  if(localStorage.getItem('jwt')){
    return JSON.parse(localStorage.getItem('jwt'));
  }else{
    return false;
  }
}