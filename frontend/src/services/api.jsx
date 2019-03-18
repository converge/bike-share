import { getToken } from './auth'
import axios from 'axios'
require('dotenv').config()

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT
})

// Intercept the request and look for JSON Web Token
api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api