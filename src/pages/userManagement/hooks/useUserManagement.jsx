import { useState } from "react"
import { api } from "../../../api/api"
import { useCallback } from "react"
import { message } from "antd"

export const useGetUserData = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState()

	const getData = useCallback(async () => {
		try {
			setIsLoading(true)

			// proses get biodata dari api
			const res = await api.getAllUser()

			// eksekusi selanjutnya
			setData(res?.data?.user?.sort((a, b) => (a.created_at > b.created_at ? -1 : 1)))
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

export const useDeleteUserData = () => {
	const [isLoadingDeleteData, setIsLoading] = useState(false)

	const deleteData = useCallback(async (id, onSuccess) => {
		try {
			setIsLoading(true)
			await api.deleteUserById(id)
			onSuccess && onSuccess()
			message.open({
				type: "success",
				content: "Deleted Successfuly",
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

	return { isLoadingDeleteData, deleteData }
}

export const useAddUserData = () => {
	const [isLoadingAddData, setIsLoadingAddData] = useState(false)

	const addData = useCallback(async (data, onSuccess) => {
		try {
			setIsLoadingAddData(true)
			await api.addUser(data)
			onSuccess && onSuccess()
			message.open({
				type: "success",
				content: "New User Added Successfuly",
			})
		} catch (err) {
			message.open({
				type: "error",
				content: `${err?.message}`,
			})
		} finally {
			setIsLoadingAddData(false)
		}
	}, [])

	return { isLoadingAddData, addData }
}

export const useEditUserData = () => {
	const [isLoadingEditData, setIsLoadingEditData] = useState(false)

	const editData = useCallback(async (id, data, onSuccess) => {
		try{
			setIsLoadingEditData(true)
			await api.editUser(id, data)
			onSuccess && onSuccess()
			message.open({
				type: "success",
				content: "Data Edited Successfuly"
			})
		}
		catch(err){
			message.open({
				type: "error",
				content: `${err?.message}`
			})
		}
		finally{
			setIsLoadingEditData(false)
		}
	}, [])

	return {isLoadingEditData, editData}
}