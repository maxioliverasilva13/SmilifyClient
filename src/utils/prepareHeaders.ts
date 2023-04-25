
const DEFAULT_TOKEN_KEY_STORAGE = "learnDoToken";

export const storageToken = (token: any) => {
    localStorage.setItem(DEFAULT_TOKEN_KEY_STORAGE, token)
}

export const getToken = () => localStorage.getItem(DEFAULT_TOKEN_KEY_STORAGE);

export const prepareHeaders = (headers: any) => {
  const token = getToken();
  if (token) {
   // include token in req header
    headers.set('Authorization', `${token}`)  
    return headers
  } else {
     // public path
     return headers;
  }
}