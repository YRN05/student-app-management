import { useCallback } from 'react'
import { api } from '../../../api/api'
import { message } from 'antd'

export const useBiodata = () => {
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
