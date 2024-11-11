import { message } from "antd"
import { useCallback } from "react"
import { useState } from "react"
import { api } from "../../../api/api"

export const useEditStudent = () => {
	const [isLoading, setIsLoading] = useState(false)

	// data: for new data
	const editData = useCallback(async (id, data, onSuccess) => {
		try {
			setIsLoading(true)
			await api.editStudent(id, data)
			onSuccess && onSuccess()
			message.open({
				type: "success",
				content: "Data saved successfully",
			})
		} catch (err) {
			message.open({
				type: "error",
				content: `${err?.message}`,
			})
		} finally {
			setIsLoading(false)
		}
	}, [])

	return [isLoading, editData]
}
