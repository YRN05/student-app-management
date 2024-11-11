import { baseApi, hasuraRestApi, sheetDbApi, uploaderApi } from "../config/api-service"

export const api = {
	// method for mock api
	getBiodata: () => {
		return baseApi.get(`/biodatas`)
	},
	getBiodataById: (id) => {
		return baseApi.get(`/biodatas/${id}`)
	},

	// method for sheetdb
	// getAllStudent: () => {
	// 	return sheetDbApi.get(`?sheet=biodatas`)
	// },
	// getStudentById: (id) => {
	// 	return sheetDbApi.get(`/search?sheet=biodatas&id=${id}`)
	// },
	// addStudent: (data) => {
	// 	return sheetDbApi.post(`?sheet=biodatas`, data)
	// },
	// deleteStudent: (id) => {
	// 	return sheetDbApi.delete(`id/${id}?sheet=biodatas`)
	// },
	// editStudent: (id, data) => {
	// 	return sheetDbApi.put(`id/${id}?sheet=biodatas`, data)
	// },

	// method for presence histories
	addPresence: (data) => {
		return sheetDbApi.post(`?sheet=histories`, data)
	},
	// hasura-user
	loginUser: (username, password) => {
		return hasuraRestApi.get(`auth/${username}/${password}`)
	},
	register: (data) => {
		return hasuraRestApi.post(`user`, data)
	},
	getUserByUserName: (username) => {
		return hasuraRestApi.get(`user/username/${username}`)
	},

	// hasura-student-datas
	getAllStudent: () => {
		return hasuraRestApi.get(`student_datas`)
	},
	addStudent: (data) => {
		return hasuraRestApi.post(`student_datas`, data)
	},
	getStudentById: (id) => {
		return hasuraRestApi.get(`student_datas/${id}`)
	},
	editStudent: (id, data) => {
		return hasuraRestApi.post(`student_datas/${id}`, data)
	},
	deleteStudent: (id) => {
		return hasuraRestApi.delete(`student_datas/${id}`)
	},

	// cloudinary
	uploader: (body) => {
		return uploaderApi.post("/dhopt3cfy/image/upload", body)
	},
}
