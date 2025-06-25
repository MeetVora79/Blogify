import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://blogify-gcdw.onrender.com/api/blogs',
})

export const authApi = axios.create({
	baseURL: 'https://blogify-gcdw.onrender.com/api/auth'
})