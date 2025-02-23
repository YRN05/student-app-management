import { DeleteFilled, EditFilled, SaveOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Tag } from "antd"
import { Flex } from "antd"
import { Space } from "antd"
import { Select } from "antd"
import { Input } from "antd"
import { Card } from "antd"
import { Table } from "antd"
import React from "react"
import { GapComponent } from "../../components/gapComponent/GapComponent"
import { useAddUserData, useDeleteUserData, useEditUserData, useGetUserData } from "./hooks/useUserManagement"
import { useEffect } from "react"
import dayjs from "dayjs"
import { useState } from "react"
import { Popconfirm } from "antd"
import { Modal } from "antd"
import { Form } from "antd"
import { edit } from "@cloudinary/url-gen/actions/animated"

export const UserManagement = () => {
	const [search, setSearch] = useState()
	const [roleValue, setRoleValue] = useState()
	const [isModalOpen, setIsModalOpen] = useState()
	const [editValue, setEditValue] = useState({})

	const [isLoading, userData, getUserData] = useGetUserData()
	const { deleteData, isLoadingDeleteData } = useDeleteUserData()
	const { addData, isLoadingAddData } = useAddUserData()
	const { isLoadingEditData, editData } = useEditUserData()

	// note: sebelum dimanipulasi data, tampung ke state
	const [data = userData, setData] = useState()

	useEffect(() => {
		getUserData()
	}, [])

	const userColumns = [
		{
			title: "User Name",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Created Date",
			dataIndex: "created_at",
			key: "created_at",
			render: (date) => dayjs(date).format("DD MMM YYYY, HH:mm:ss"),
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			render: (text) => <Tag color={text === "ADMIN" ? "gold" : "geekblue"}>{text?.toUpperCase()}</Tag>,
		},
		{
			render: (_, record) => (
				<Space>
					<Button
						icon={<EditFilled />}
						onClick={() => {
							setIsModalOpen(true)
							setEditValue(record)
						}}
					/>
					<Popconfirm
						title="Delete the user"
						description="Are you sure to delete this user?"
						// untuk mengirim id spesifik gunakan arow function
						onConfirm={() => onDelete(record.id)}
						okText="Yes"
						cancelText="No"
					>
						<Button icon={<DeleteFilled />} danger />
					</Popconfirm>
				</Space>
			),
		},
	]

	const onDelete = (id) => {
		deleteData(id, () => {
			getUserData()
		})
	}

	const onSearch = (e) => {
		setSearch(e.target.value)
		handleSearch("search", e.target.value)
	}

	const onFilter = (value) => {
		setRoleValue(value)
		handleSearch("role", value)
	}

	const handleSearch = (type, value) => {
		const searchValue = type === "search" ? value : search
		const searchRole = type === "role" ? value : roleValue

		const filteredUser = userData?.filter((item) => {
			const isMatchUser = searchValue ? item.username.toLowerCase().includes(searchValue.toLowerCase()) : true
			const isMatchEmail = searchValue ? item.email.toLowerCase().includes(searchValue.toLowerCase()) : true

			const isMatchRole = searchRole ? item.role === searchRole : true

			return (isMatchUser || isMatchEmail) && isMatchRole
		})

		setData(filteredUser)
	}

	const onAddUser = () => {
		setIsModalOpen(true)
	}

	const handleAddUser = (value) => {
		const body = {
			object: value,
		}
		addData(body, () => {
			setIsModalOpen(false)
			getUserData()
		})
	}

	const handleEditUser = (value) => {
		const body = {
			object: value,
		}
		editData(editValue.id, body, () => {
			setIsModalOpen(false)
			getUserData()
		})
	}

	return (
		<Card>
			<Flex justify="space-between">
				<Space>
					<Input placeholder="Search User" prefix={<SearchOutlined />} onChange={onSearch} />
					<Select
						placeholder="Role"
						style={{ width: 150 }}
						onChange={onFilter}
						options={[
							{
								value: "ADMIN",
								label: "Admin",
							},
							{
								value: "STUDENT",
								label: "Student",
							},
						]}
					/>
				</Space>
				<Button type="primary" onClick={onAddUser}>
					Add User
				</Button>
				<Modal
					title="Add New User"
					open={isModalOpen}
					destroyOnClose
					okButtonProps={{
						htmlType: "submit",
						loading: isLoadingAddData,
						icon: <SaveOutlined />,
					}}
					onCancel={() => setIsModalOpen(false)}
					modalRender={(dom) => (
						<Form
							name="addUserModal"
							onFinish={editValue ? handleEditUser : handleAddUser}
							layout="vertical"
							initialValues={editValue ? editValue : {}}
						>
							{dom}
						</Form>
					)}
				>
					{/* <Form.Item name="id" hidden>
						<Input hidden/>
					</Form.Item> */}
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<Input placeholder="Username" />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
						]}
					>
						<Input placeholder="Email" />
					</Form.Item>
					<Form.Item
						label="Role"
						name="role"
						rules={[
							{
								required: true,
								message: "Please input your Role!",
							},
						]}
					>
						<Select
							options={[
								{ value: "ADMIN", label: "Admin" },
								{ value: "STUDENT", label: "Student" },
							]}
							placeholder="Role"
						/>
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password placeholder="Password" />
					</Form.Item>
				</Modal>
			</Flex>

			<GapComponent height={20} />

			<Table columns={userColumns} dataSource={data} loading={isLoading} rowKey="id" />
		</Card>
	)
}
