import axios from 'axios'

const session = {
    login: localStorage.getItem('login'),
    senha: localStorage.getItem('senha'),
    uid: localStorage.getItem('uid'),
}

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: { 'Content-Type': 'application/json' },
    auth: session
})

export default api