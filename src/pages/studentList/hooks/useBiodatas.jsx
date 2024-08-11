import { useCallback } from 'react'
import { useState } from 'react'
import { message } from 'antd'
import { api } from '../../../api/api'

// untuk ambil semua data dari biodata
export const useGetBiodata = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState()

	const getData = useCallback(async () => {
		try {
			setIsLoading(true)

			// proses get biodata dari api
			const res = await api.getAllStudent()

			// eksekusi selanjutnya
			setData(res?.data?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)))
		} catch (err) {
			message.open({
				type: 'error',
				content: `${err?.message}`,
			})
		} finally {
			setIsLoading(false)
		}
	}, [])

	return [isLoading, data, getData]
}

export const useAddBiodata = () => {
	const [isLoading, setIsLoading] = useState(false)

	const addData = useCallback(async (data, onSuccess) => {
		try {
			setIsLoading(true)

			await api.addStudent(data)
			onSuccess && onSuccess()
			message.open({
				type: 'success',
				content: 'Data added successfully',
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

	return [isLoading, addData]
}
