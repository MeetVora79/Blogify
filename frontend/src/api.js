import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://blogify-production-a54b.up.railway.app/api/blogs',
})

export const authApi = axios.create({
	baseURL: 'https://blogify-production-a54b.up.railway.app/api/auth'
})
