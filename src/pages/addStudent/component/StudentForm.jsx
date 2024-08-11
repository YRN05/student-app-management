import { HomeOutlined, InboxOutlined, NumberOutlined, SaveOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, Flex, Form, Input, Radio, Row, Select, Upload } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { CLASS_OPTIONS } from '../Constant'
import { usePostBiodata } from '../hooks/useAddStudent'
import { useParams } from 'react-router-dom'
import { GapComponent } from '../../../components/gapComponent/GapComponent'
import { useGetDetailBiodata } from '../../detailPage/hooks/useDetailBiodatas'
import { useEffect } from 'react'

const { TextArea } = Input
const { Dragger } = Upload

export const StudentForm = ({ isEdit }) => {
	const { id } = useParams()
	const [isLoadingBiodata, biodata, getDetailBiodata] = useGetDetailBiodata()
	console.log(biodata)
	useEffect(() => {
		getDetailBiodata(id)
	}, [id, getDetailBiodata])
	const detailBiodata = biodata?.length > 0 ? biodata[0] : {}

	const [gender, setGender] = useState()

	const navigate = useNavigate()

	const [isLoadingAddStudent, addStudentData] = usePostBiodata()

	const handleGender = (e) => {
		console.log('test radio gender' + e.target.value)
		setGender(e.target.value)
	}

	const addStudent = (values) => {
		// change the date format
		values.dateOfBirth = dayjs(values.dateOfBirth).toISOString()

		values.id = uuid()
		values.photo =
			values.photo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl2dWQqcrJa3mAOe1ACtrOuQxkYz-stGMtFA&s'
		values.createdAt = dayjs().toISOString()

		console.log(values)

		addStudentData(values, () => {
			navigate(-1)
		})
	}

	const props = {
		name: 'file',
		multiple: true,
		action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
		onChange(info) {
			const { status } = info.file
			if (status !== 'uploading') {
				console.log(info.file, info.fileList)
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`)
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`)
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files)
		},
	}

	console.log(detailBiodata.firstName)
	return (
		<div>
			{/* Title and add button */}

			{/* firstName, lastName, class, address, age field */}
			<Form
				layout="vertical"
				onFinish={addStudent}
				initialValues={isEdit ? { firstName: detailBiodata.firstName } : {}}
			>
				<Flex justify="space-between" align="center">
					<h1 style={{ fontSize: 40 }}>{isEdit ? 'Edit Student' : 'Add Student'}</h1>
					<Button loading={isLoadingAddStudent} icon={<SaveOutlined />} size="large" type="primary" htmlType="submit">
						Save
					</Button>
				</Flex>

				<Flex gap={30}>
					<Card style={{ width: 650 }}>
						<Form.Item
							name="firstName"
							rules={[
								{
									required: true,
									message: 'Please input your first name!',
								},
							]}
						>
							<Input prefix={<UserAddOutlined />} placeholder="First Name" />
						</Form.Item>
						<Form.Item
							name="lastName"
							rules={[
								{
									required: true,
									message: 'Please input your last name!',
								},
							]}
						>
							<Input prefix={<UserAddOutlined />} placeholder="Last Name" />
						</Form.Item>
						<Form.Item
							name="kelas"
							rules={[
								{
									required: true,
									message: 'Please input your class!',
								},
							]}
						>
							<Select placeholder="Class" options={CLASS_OPTIONS} />
						</Form.Item>
						<Form.Item
							name="address"
							rules={[
								{
									required: true,
									message: 'Please input your address!',
								},
							]}
						>
							<TextArea rows={4} prefix={<HomeOutlined />} placeholder="Address" />
						</Form.Item>
						<Form.Item
							name="age"
							rules={[
								{
									required: true,
									message: 'Please input your age!',
								},
							]}
						>
							<Input prefix={<NumberOutlined />} placeholder="Age" />
						</Form.Item>
						<Row gutter={5}>
							<Col span={12}>
								<Form.Item
									name="placeOfBirth"
									label="Place and Date of Birth"
									rules={[
										{
											required: true,
											message: 'Please input your date of birth!',
										},
									]}
								>
									<Input placeholder="Place" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="dateOfBirth"
									label=" "
									required={false}
									rules={[
										{
											required: true,
											message: 'Please input your date of birth!',
										},
									]}
								>
									<DatePicker style={{ width: '100%' }} />
								</Form.Item>
							</Col>
						</Row>
						<Flex vertical={'horizontal'}>
							<p>NIS</p>
							<Form.Item
								name="nis"
								rules={[
									{
										required: true,
										message: 'Please input your nis!',
									},
								]}
							>
								<Input placeholder="NIS" style={{ width: 285 }} />
							</Form.Item>
						</Flex>
						<Flex vertical={'horizontal'}>
							<h2>Gender</h2>
							<Form.Item name="gender">
								<Radio.Group onChange={handleGender} value={gender}>
									<Radio value="Male">Male</Radio>
									<Radio value="Female">Female</Radio>
								</Radio.Group>
							</Form.Item>
						</Flex>
						<Flex vertical={'horizontal'}>
							<h2>Phone Number</h2>
							<Form.Item
								name="phoneNumber"
								rules={[
									{
										required: true,
										message: 'Please input your phone number!',
									},
								]}
							>
								<Input placeholder="62" style={{ width: 285 }} />
							</Form.Item>
						</Flex>
					</Card>

					{/* Upload image  [problem: resize and logic to add]*/}
					<Card style={{ width: '50%', height: '50%' }}>
						<h2 style={{ marginTop: -5 }}>Upload Student Image</h2>
						<Form.Item name="picture">
							<Dragger {...props}>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text">Click or drag file to this area to upload</p>
								<p className="ant-upload-hint">
									Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
									files.
								</p>
							</Dragger>
						</Form.Item>
					</Card>
				</Flex>

				<GapComponent height={30} />
			</Form>
		</div>
	)
}
