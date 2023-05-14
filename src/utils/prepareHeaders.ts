
const DEFAULT_TOKEN_KEY_STORAGE = "smilifyToken";

export const storageToken = (token: any) => {
    localStorage.setItem(DEFAULT_TOKEN_KEY_STORAGE, token)
}

export const getToken = () => localStorage.getItem(DEFAULT_TOKEN_KEY_STORAGE);

export const prepareHeaders = (headers: any) => {
  const token = getToken();
  // headers.set('Access-Control-Allow-Origin', `*`)  
  // headers.set('Access-Control-Allow-Credentials', `true`)  
  // headers.set('Access-Control-Allow-Methods', `GET, POST, DELETE, PUT, OPTIONS, HEAD`)  
  // headers.set('Access-Control-Allow-Headers', `Content-Type, Accept, X-Requested-With`)  
  if (token) {
   // include token in req header
    headers.set('Authorization', `${token}`) 
    return headers
  } else {
     // public path
     return headers;
  }
}

export const prepareHeadersWithCors = (headers: any) => {
  const token = getToken();
  headers.set('Access-Control-Allow-Origin', `*`)  
  headers.set('Access-Control-Allow-Credentials', `true`)  
  headers.set('Access-Control-Allow-Methods', `GET, POST, DELETE, PUT, OPTIONS, HEAD`)  
  headers.set('Access-Control-Allow-Headers', `Content-Type, Accept, X-Requested-With`)  
  if (token) {
   // include token in req header
    headers.set('Authorization', `${token}`) 
    return headers
  } else {
     // public path
     return headers;
  }
}