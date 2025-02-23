import { Button, Mentions } from "antd"
import { Menu } from "antd"
import { Layout } from "antd"
import React from "react"
import { Suspense } from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { HEADER_MENU } from "./Constant"
import { ConfigProvider } from "antd"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Avatar } from "antd"
import { Flex } from "antd"
import { Dropdown } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import "./publicLayout.css"
import { Modal } from "antd"
import { Form } from "antd"
import { Input } from "antd"
import { useEditUser } from "../hooks/useUserProfile"
import { Tag } from "antd"
import { titleCase } from "../utils/stringManipulation"
import { GapComponent } from "../components/gapComponent/GapComponent"
import { PageTitle } from "./PageTitle"
import { Space } from "antd"
const { Sider, Header, Content, Footer } = Layout

export const PublickLayout = () => {
	// define hooks
	const [isLoading, editUser] = useEditUser()

	const [form] = Form.useForm()

	// status collapsing
	const [collapsed, setCollapsed] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const location = useLocation()
	const userData = JSON.parse(localStorage.getItem("userData"))

	// to display the inial username by taking the first character from email
	const initial = userData?.email.substring(0, 1)?.toUpperCase()

	const navigate = useNavigate()

	// handling logout action
	const handleLogOut = () => {
		localStorage.removeItem("userData")
		navigate("/auth")
	}

	// contaning item when profile dropdown
	const items = [
		{
			label: (
				<div style={{ textAlign: "center" }} onClick={() => setIsModalOpen(true)}>
					Profile
				</div>
			),
			key: 0,
		},
		{
			type: "divider",
		},
		{
			label: (
				<a onClick={handleLogOut}>
					<Flex justify="center">
						<LogoutOutlined style={{ marginRight: 10 }} />
						Log Out
					</Flex>
				</a>
			),
			key: 1,
			danger: true,
		},
	]

	const handleOk = (values) => {
		console.log(values)
		delete values.confirm
		const body = {
			object: values,
		}
		editUser(userData?.id, body, () => {
			setIsModalOpen(false)
		})
	}

	return (
		<ConfigProvider
			theme={{
				components: {
					Menu: {
						itemSelectedColor: "#EEEEEE",
					},
				},
			}}
		>
			<Layout
				style={{
					minHeight: "100vh",
				}}
			>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
					theme="light"
					style={{ position: "fixed", height: "88vh", borderRadius: "20px", margin: "10px" }}
				>
					<div
						style={{
							padding: 20,
							textAlign: "center",
							backgroundColor: "#EEEEEE",
							borderRadius: 15,
							margin: 10,
						}}
					>
						{collapsed ? (
							<h1>S</h1>
						) : (
							<>
								<h1 style={{ marginBottom: -15 }}>Student App</h1>
								<h4>Management</h4>
							</>
						)}
					</div>
					<Flex justify="center" align="center">
						<Tag style={{ fontSize: "15px" }}>{titleCase(userData?.role)}</Tag>
					</Flex>
					<GapComponent height={5} />
					<Menu
						mode="inline"
						items={HEADER_MENU.map((item) => ({
							key: item.key,
							label: <Link to={item.path}>{item.label}</Link>,
							icon: item.icon,
						}))}
						selectedKeys={location.pathname}
					/>
				</Sider>
				<Layout
					style={{
						marginLeft: collapsed ? 100 : 220,
					}}
				>
					<Header
						style={{
							padding: 0,
							backgroundColor: "#31363F",
							margin: 10,
							borderRadius: 20,
						}}
					>
						<Flex justify="space-between" align="center">
							<PageTitle />
							<Space>
								<div className="user-name" style={{ fontSize: "20px", color: "white", marginRight: "10px" }}>
									{userData?.username}
								</div>
								<Dropdown menu={{ items }} trigger={["click"]}>
									<a onClick={(e) => e.preventDefault()}>
										<Avatar
											style={{
												backgroundColor: "#f56a00",
												verticalAlign: "middle",
												marginRight: 10,
											}}
											size="large"
											shape="square"
											gap={1}
										>
											{initial}
										</Avatar>
									</a>
								</Dropdown>
							</Space>
						</Flex>
					</Header>
					<Content
						style={{
							margin: "0 10px",
						}}
					>
						<Suspense>
							<Outlet />
							<Modal
								title="Profile"
								open={isModalOpen}
								onCancel={() => setIsModalOpen(false)}
								centered
								okText="Update Profile"
								cancelText="Cancel"
								okButtonProps={{
									autoFocus: true,
									htmlType: "submit",
								}}
								destroyOnClose
								modalRender={(dom) => (
									<Form
										layout="vertical"
										form={form}
										name="form_profile"
										initialValues={{
											username: userData?.username,
											email: userData?.email,
										}}
										clearOnDestroy
										onFinish={(values) => handleOk(values)}
									>
										{dom}
									</Form>
								)}
							>
								<Form.Item
									name="username"
									label="User Name"
									rules={[
										{
											required: true,
											message: "Please input your new user name",
										},
									]}
								>
									<Input placeholder="Input your new user name" />
								</Form.Item>

								<Form.Item name="email" label="Email">
									<Input disabled />
								</Form.Item>

								<Form.Item
									name="password"
									label="Password"
									hasFeedback
									rules={[
										{
											required: true,
											message: "Please input your password!",
										},
										// conditional regex
										{
											// regex syntax
											pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])(?=.{8,})/,
											message: "Your password doesnt strong enough",
										},
									]}
								>
									<Input.Password placeholder="Input your new password" />
								</Form.Item>
								<Form.Item
									name="confirm"
									label="Confirm Password"
									dependencies={["password"]}
									rules={[
										{
											required: true,
											message: "Please input your password!",
										},
										({ getFieldValue }) => ({
											validator(rule, value) {
												if (getFieldValue("password") === value) {
													return Promise.resolve()
												} else {
													return Promise.reject(new Error("password tidak sama"))
												}
											},
										}),
									]}
									hasFeedback
								>
									<Input.Password placeholder="Confirm Password" />
								</Form.Item>
							</Modal>
						</Suspense>
					</Content>
					<Footer
						style={{
							textAlign: "center",
						}}
					>
						Student App{new Date().getFullYear()} Created by Yohanes Raka Nugroho
					</Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	)
}
