import React from "react"
import { useCallback } from "react"
import { useState } from "react"
import { api } from "../../../api/api"
import { message } from "antd"

export const useGetDetailBiodata = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState()

	const getDetailData = useCallback(async (id) => {
		try {
			const res = await api.getStudentById(id)
			setData(res?.data?.student_datas_by_pk)
		} catch (err) {
			message.open({
				type: "error",
				content: `${err?.message}`,
			})
		} finally {
			setIsLoading(false)
		}
	}, [])

	return [isLoading, data, getDetailData]
}

export const useDeleteBiodata = () => {
	const [isLoading, setIsLoading] = useState(false)

	// data: for new data
	const deleteData = useCallback(async (id, onSuccess) => {
		try {
			setIsLoading(true)
			await api.deleteStudent(id)
			onSuccess && onSuccess()
			message.open({
				type: "success",
				content: "Data deleted successfully",
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

	return [isLoading, deleteData]
}
