import axios from 'axios'

// const baseURL = 'http://localhost:8001/api'
const baseURL = 'https://api.godelivery-univo.com/api'

const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default http
