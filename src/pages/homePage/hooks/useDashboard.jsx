import { useCallback } from "react"
import { useState } from "react"
import { message } from "antd"
import { api } from "../../../api/api"

// untuk ambil semua data dari biodata
export const useGetAllStudent = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState()

	const getData = useCallback(async () => {
		try {
			setIsLoading(true)

			// proses get biodata dari api
			const res = await api.getAllStudent()

			// eksekusi selanjutnya
			setData(res?.data?.student_datas)
		} catch (err) {
			message.open({
				type: "error",
				content: `${err?.message}`,
			})
		} finally {
			setIsLoading(false)
		}
	}, [])

	return [isLoading, data, getData]
}
