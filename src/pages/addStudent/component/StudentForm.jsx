import {
	DeleteOutlined,
	HomeOutlined,
	InboxOutlined,
	NumberOutlined,
	PlusOutlined,
	SaveOutlined,
	UserAddOutlined,
} from "@ant-design/icons"
import { Button, Card, Col, DatePicker, Flex, Form, Input, Radio, Row, Select, Upload } from "antd"
import dayjs from "dayjs"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { CLASS_OPTIONS } from "../Constant"
import { usePostBiodata } from "../hooks/useAddStudent"
import { useParams } from "react-router-dom"
import { GapComponent } from "../../../components/gapComponent/GapComponent"
import { useGetDetailBiodata } from "../../detailPage/hooks/useDetailBiodatas"
import { useEffect } from "react"
import { useEditStudent } from "../../editStudent/hooks/useEditStudent"
import { getBase64 } from "../../../utils/getBase64"
import { uploaderConfig } from "../../../config/uploader-config"
import { useSingleUploader } from "../../../hooks/useSingleUploader"
import { Image } from "antd"
import ImgCrop from "antd-img-crop"

const { TextArea } = Input
const { Dragger } = Upload

export const StudentForm = ({ isEdit }) => {
	// get id dari url
	const { id } = useParams()

	const [isLoadingBiodata, biodata, getDetailBiodata] = useGetDetailBiodata()
	const [isLoadingAddStudent, addStudentData] = usePostBiodata()
	const [isLoadingEditStudent, editStudentData] = useEditStudent()
	const [isLoading, upload] = useSingleUploader()
	const [gender, setGender] = useState()

	const [filelist, setFilelist] = useState()
	const [previewOpen, setPreviewOpen] = useState(false)

	const detailBiodata = biodata
	const [avatar = detailBiodata?.photo_url, setAvatar] = useState(detailBiodata?.photo_url)

	useEffect(() => {
		if (isEdit) {
			setAvatar(detailBiodata?.photo_url)
			setFilelist([{ uid: "-1", name: "user.png", status: "done", url: detailBiodata?.photo_url }])
		}
	}, [isEdit, detailBiodata])

	useEffect(() => {
		if (isEdit) getDetailBiodata(id)
	}, [id])

	const navigate = useNavigate()

	const handleGender = (e) => {
		console.log("test radio gender" + e.target.value)
		setGender(e.target.value)
	}

	const addStudent = (values) => {
		// change the date format
		values.date_of_birth = dayjs(values.date_of_birth).toISOString()

		// values.id = uuid()
		values.photo_url =
			avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl2dWQqcrJa3mAOe1ACtrOuQxkYz-stGMtFA&s"
		// values.created_at = dayjs().toISOString()
		values.major = values.class.substring(3, 5)
		const body = {
			object: values,
		}

		addStudentData(body, () => {
			navigate(-1)
		})
	}

	const editStudent = (values) => {
		values.date_of_birth = dayjs(values.date_of_birth).toISOString()

		values.photo_url =
			avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl2dWQqcrJa3mAOe1ACtrOuQxkYz-stGMtFA&s"

		console.log(values)

		const body = {
			object: values,
		}

		editStudentData(id, body, () => {
			navigate(-1)
		})
	}

	const handleUpload = async (file) => {
		console.log(file)
		// body adalah payload (yang dikirimkan)
		const body = {
			file: await getBase64(file.file.originFileObj),
			upload_preset: uploaderConfig.upload_preset,
			api_key: uploaderConfig.api_key,
			public_id: file.file.name,
		}
		upload(body, (data) => {
			setAvatar(data.url)
			setFilelist([{ uid: "-1", name: file.file.name, status: "done", url: data.url }])
		})
	}

	return (
		<div>
			{/* Title and add button */}

			{/* firstName, lastName, class, address, age field */}
			<Form
				layout="vertical"
				onFinish={isEdit ? editStudent : addStudent}
				// initialValues={isEdit ? { first_name: detailBiodata?.first_name } : {}}
				fields={[
					{
						name: "first_name",
						value: isEdit ? detailBiodata?.first_name : undefined,
					},
					{
						name: "last_name",
						value: isEdit ? detailBiodata?.last_name : "",
					},
					{
						name: "class",
						value: isEdit ? detailBiodata?.class : "",
					},
					{
						name: "address",
						value: isEdit ? detailBiodata?.address : "",
					},
					{
						name: "age",
						value: isEdit ? detailBiodata?.age : "",
					},
					{
						name: "place_of_birth",
						value: isEdit ? detailBiodata?.place_of_birth : "",
					},
					{
						name: "date_of_birth",
						value: isEdit ? dayjs(detailBiodata?.date_of_birth) : "",
					},
					{
						name: "nis",
						value: isEdit ? detailBiodata?.nis : "",
					},
					{
						name: "gender",
						value: isEdit ? detailBiodata?.gender : "",
					},
					{
						name: "phone_number",
						value: isEdit ? detailBiodata?.phone_number : "",
					},
				]}
			>
				<Flex justify="space-between" align="center">
					<h1 style={{ fontSize: 40 }}>{isEdit ? "Edit Student" : "Add Student"}</h1>
					<Button
						loading={isLoadingAddStudent || isLoadingEditStudent}
						icon={<SaveOutlined />}
						size="large"
						type="primary"
						htmlType="submit"
					>
						Save
					</Button>
				</Flex>

				<Flex gap={30}>
					<Card style={{ width: 650 }}>
						<Form.Item
							name="first_name"
							rules={[
								{
									required: true,
									message: "Please input your first name!",
								},
							]}
						>
							<Input prefix={<UserAddOutlined />} placeholder="First Name" />
						</Form.Item>
						<Form.Item
							name="last_name"
							rules={[
								{
									required: true,
									message: "Please input your last name!",
								},
							]}
						>
							<Input prefix={<UserAddOutlined />} placeholder="Last Name" />
						</Form.Item>
						<Form.Item
							name="class"
							rules={[
								{
									required: true,
									message: "Please input your class!",
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
									message: "Please input your address!",
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
									message: "Please input your age!",
								},
							]}
						>
							<Input prefix={<NumberOutlined />} placeholder="Age" />
						</Form.Item>
						<Row gutter={5}>
							<Col span={12}>
								<Form.Item
									name="place_of_birth"
									label="Place and Date of Birth"
									rules={[
										{
											required: true,
											message: "Please input your date of birth!",
										},
									]}
								>
									<Input placeholder="Place" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="date_of_birth"
									label=" "
									required={false}
									rules={[
										{
											required: true,
											message: "Please input your date of birth!",
										},
									]}
								>
									<DatePicker style={{ width: "100%" }} />
								</Form.Item>
							</Col>
						</Row>
						<Flex vertical={"horizontal"}>
							<p>NIS</p>
							<Form.Item
								name="nis"
								rules={[
									{
										required: true,
										message: "Please input your nis!",
									},
								]}
							>
								<Input placeholder="NIS" style={{ width: 285 }} />
							</Form.Item>
						</Flex>
						<Flex vertical={"horizontal"}>
							<h2>Gender</h2>
							<Form.Item name="gender">
								<Radio.Group>
									<Radio value="Male">Male</Radio>
									<Radio value="Female">Female</Radio>
								</Radio.Group>
							</Form.Item>
						</Flex>
						<Flex vertical={"horizontal"}>
							<h2>Phone Number</h2>
							<Form.Item
								name="phone_number"
								rules={[
									{
										required: true,
										message: "Please input your phone number!",
									},
								]}
							>
								<Input placeholder="62" style={{ width: 285 }} />
							</Form.Item>
						</Flex>
					</Card>

					{/* Upload image  [problem: resize and logic to add]*/}
					<Card style={{ width: "50%", height: "50%" }}>
						<h2 style={{ marginTop: -5 }}>Upload Student Image</h2>
						<Form.Item name="picture">
							{/* {avatar ? (
								<img src={avatar} alt="avatar-image" style={{ width: 200 }} />
							) : ( */}
							<ImgCrop rotationSlider>
								<Upload
									// showUploadList={false}
									fileList={filelist}
									name="avatar"
									maxCount={1}
									customRequest={() => {}}
									listType="picture-card"
									// onPreview={handlePreview}
									onChange={handleUpload}
									onRemove={() => {
										setAvatar("")
										setFilelist([])
									}}
									onPreview={() => {
										setPreviewOpen(true)
									}}
								>
									<button
										style={{
											border: 0,
											background: "none",
										}}
										type="button"
									>
										<PlusOutlined />
										<div
											style={{
												marginTop: 8,
											}}
										>
											{avatar ? "Replace Image" : "Upload"}
										</div>
									</button>
								</Upload>
							</ImgCrop>
							{avatar && (
								<Image
									wrapperStyle={{
										display: "none",
									}}
									preview={{
										visible: previewOpen,
										onVisibleChange: (visible) => setPreviewOpen(visible),
										afterOpenChange: (visible) => !visible,
									}}
									src={avatar}
								/>
							)}
							{/* )} */}
						</Form.Item>
					</Card>
				</Flex>

				<GapComponent height={30} />
			</Form>
		</div>
	)
}
