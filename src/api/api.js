import { baseApi, sheetDbApi } from '../config/api-service'

export const api = {
	// method for mock api
	getBiodata: () => {
		return baseApi.get(`/biodatas`)
	},
	getBiodataById: (id) => {
		return baseApi.get(`/biodatas/${id}`)
	},

	// method for sheetdb
	getAllStudent: () => {
		return sheetDbApi.get(`?sheet=biodatas`)
	},
	getStudentById: (id) => {
		return sheetDbApi.get(`/search?sheet=biodatas&id=${id}`)
	},
	addStudent: (data) => {
		return sheetDbApi.post(`?sheet=biodatas`, data)
	},
	removeStudent: (id) => {
		return sheetDbApi.delete(`id/${id}?sheet=biodatas`)
	},
	editStudent: (id, data) => {
		return sheetDbApi.patch(`id/${id}?sheet=biodatas`, data)
	}
}
