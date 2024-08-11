import React from 'react'
import { StudentForm } from './component/StudentForm'

export const AddStudent = () => {
	// "isEdit" namanya passing form
	return <StudentForm isEdit={false} />
}
