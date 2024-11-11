import axios from "axios"

export const baseApi = axios.create({
	baseURL: import.meta.env.VITE_MOCK_API_SERVICE,
})
export const sheetDbApi = axios.create({
	baseURL: import.meta.env.VITE_SHEETDB_API_SERVICE,
})

export const hasuraRestApi = axios.create({
	baseURL: import.meta.env.VITE_HASURA_REST_API_SERVICE,
	headers: {
		"Content-Type": "application/json",
		"x-hasura-admin-secret": import.meta.env.VITE_HASURA_ADMIN_SECRET,
	},
})

export const uploaderApi = axios.create({
	baseURL: import.meta.env.VITE_UPLOADER_API_SERVICE,
})
