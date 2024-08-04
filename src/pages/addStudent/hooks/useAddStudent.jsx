import { message } from 'antd'
import { useCallback } from 'react'
import { useState } from 'react'
import { api } from '../../../api/api'

export const usePostBiodata = () => {
	const [isLoading, setIsLoading] = useState(false)

    // data: for new data
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
