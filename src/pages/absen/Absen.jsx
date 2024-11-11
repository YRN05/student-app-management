import { DatePicker } from 'antd'
import { Cascader } from 'antd'
import { Form } from 'antd'
import React from 'react'

export const Absen = () => {
	const studentOption = () => {}

	return (
		<>
			<h1>Student Absen</h1>
			<Form>
				<Form.Item name="dateAbsen">
					<DatePicker />
				</Form.Item>
				<Form.Item name="studentName">
					<Cascader options={studentOption} />
				</Form.Item>
			</Form>
		</>
	)
}
