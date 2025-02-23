import { message } from "antd"
import { useCallback } from "react"
import { useState } from "react"
import { api } from "../api/api"

export const useEditUser = () => {
	const [isLoading, setIsLoading] = useState(false)

	// data: for new data
	const editData = useCallback(async (id, data, onSuccess) => {
		try {
			setIsLoading(true)
			const res = await api.editUser(id, data)
			if (res.data) {
				localStorage.setItem("userData", JSON.stringify(res.data.update_user_by_pk))
				onSuccess && onSuccess()
				message.open({
					type: "success",
					content: "Data saved successfully",
				})
			}
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