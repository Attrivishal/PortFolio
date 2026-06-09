//Apis
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})
//Auth
export const sendMessage = (data) => api.post('/contact', data).then(r => r.data)
export const getMessages = () => api.get('/messages').then(r => r.data)
export default api
