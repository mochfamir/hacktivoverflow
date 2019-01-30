const axios = require('axios')

export const baseUrl = axios.create({
  baseURL: 'http://localhost:3000/'
})
