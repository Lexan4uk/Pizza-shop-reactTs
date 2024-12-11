import { create } from 'apisauce'


export const api = create({
  baseURL: 'https://nf.kvokka.net/api/',
  headers: { Accept: "application/json" },
})
api.addRequestTransform(request => {
  const token = localStorage.getItem('token');
  if (token && request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`
  } 
})
export const kladrapi = create({
  baseURL: 'https://kladr-api.ru/',
  headers: { Accept: "application/json"}
})