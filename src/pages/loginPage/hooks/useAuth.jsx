import { useCallback } from 'react'
import { useState } from 'react'
import { message } from 'antd'
import { api } from '../../../api/api'
import { useNavigate } from 'react-router-dom'

// untuk ambil semua data dari biodata
export const useLogin = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const login = useCallback(async (username, password) => {
		try {
			setIsLoading(true)

			// proses get biodata dari api
			const res = await api.loginUser(username, password)

			if (res.data.user.length > 0) {
				// masukin ke local storage (untuk akses data profile tanpa memproses get api)
				localStorage.setItem('userData', JSON.stringify(res.data.user[0]))
				message.open({
					type: 'success',
					content: 'Login success',
				})
				navigate('/') // redirect ke halaman home
			} else {
				message.error('Invalid username or password')
			}
		} catch (err) {
			message.open({
				type: 'error',
				content: `${err?.message}`,
			})
		} finally {
			setIsLoading(false)
		}
	}, [])

	return [isLoading, login]
}

export const useRegister = () => {
	const [isLoading, setIsLoading] = useState(false)

	// data: for new data
	const register = useCallback(async (data, onSuccess) => {
		try {
			setIsLoading(true)
			await api.register(data)
			onSuccess && onSuccess()
			message.open({
				type: 'success',
				content: 'Register successfully',
			})
		} catch (err) {
			message.open({
				type: 'error',
				content: `${err?.message}`,
			})
		} finally {
			setIsLoading(false)
		}
	}, [])

	return [isLoading, register]
}

export const useGetUserByUserName = () => {
	const [data, setData] = useState()

	const getData = useCallback(async (username, onSuccess) => {
		try {
			// proses get biodata dari api
			const res = await api.getUserByUserName(username)

			// eksekusi selanjutnya
			setData(res?.data)
			onSuccess && onSuccess(res.data.user)
		} catch (err) {
			message.open({
				type: 'error',
				content: `${err?.message}`,
			})
		}
	}, [])

	return [data, getData]
}
