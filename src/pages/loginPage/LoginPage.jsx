import { Button, Form } from 'antd'
import { Input } from 'antd'
import { Card } from 'antd'
import React from 'react'
import './loginPage.css'
import { Radio } from 'antd'
import { useState } from 'react'
import { Flex } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import { message } from 'antd'
import { LogInIcon, RegisIcon } from '../../assets'

export const LoginPage = () => {
	// stating wich page
	const [page, setPage] = useState('logIn')

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [password, setPassword] = useState('')

	// console.log(isModalOpen)
	const navigate = useNavigate()

	const onLogin = () => {
		setIsModalOpen(true)
	}

	const onRegist = (values) => {
		// console.log(values)
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setPage('logIn')
		setIsModalOpen(false)
	}

	const handleLogIn = (values) => {
		console.log(values)
		localStorage.setItem('userData', JSON.stringify(values))

		// beralih ke halaman lain
		navigate('/')
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const [form] = Form.useForm()
	console.log(page)
	return (
		<div className="all">
			<Card
				title={
					<Flex justify="center">
						<h1>Welcome</h1>
					</Flex>
				}
				bordered={false}
				className="card"
				style={{ width: 400 }}
			>
				<Flex justify="center">
					<Radio.Group
						buttonStyle="solid"
						defaultValue="logIn"
						// transver to page useState
						value={page}
						className="radio"
						style={{ margin: 10 }}
						onChange={(e) => {
							setPage(e.target.value)
							form.resetFields() //for reseting the form
						}}
					>
						{/* value ini yang dikirim ke state */}
						<Radio.Button value="logIn">Log In</Radio.Button>
						<Radio.Button value="register">Register</Radio.Button>
					</Radio.Group>
				</Flex>

				<Form
					name="authForm"
					form={form}
					style={{
						maxWidth: 600,
					}}
					onFinish={page === 'register' ? onRegist : handleLogIn}
				>

					{/* if the page is on regist or login conditional */}
					{page === 'register' && (
						<Form.Item
							name="userName"
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
						>
							<Input prefix={<UserOutlined />} placeholder="User Name" />
						</Form.Item>
					)}

					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your Email!',
							},
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
						]}
					>
						<Input prefix={<MailOutlined />} placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="password"
						value={password}
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
							// conditional regex
							page === 'register' && {
								// regex syntax
								pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])(?=.{8,})/,
								message: 'Your password doensnt strong enough',
							},
						]}
					>
						<Input.Password prefix={<LockOutlined />} placeholder="Password" />
					</Form.Item>
					{page === 'register' && (
						<Form.Item
							name="confirm"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (getFieldValue('password') === value) {
											return Promise.resolve()
										} else {
											return Promise.reject(new Error('password tidak sama'))
										}
									},
								}),
							]}
							hasFeedback
						>
							<Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
						</Form.Item>
					)}

					{page === 'register' ? (
						<>
							<Button type="primary" htmlType="submit" block>
								Register
							</Button>
							<Modal open={isModalOpen} onOk={handleOk} okText="Log In" cancelText="Close" onCancel={handleCancel}>
								<Flex justify="center">
									<div className="title-regis">
										<h1>Registration Compleate</h1>
										<p>Please Log In</p>
									</div>

									<img src={RegisIcon} alt="icon-succes" style={{ width: 300 }} />
								</Flex>
							</Modal>
						</>
					) : (
						<>
							<Button type="primary" htmlType='submit' block>
								Log In
							</Button>
							<Modal open={isModalOpen} okText={"Log In"} onCancel={handleCancel}>
								<Flex>
									<h1>Log In Succes</h1>
									<img src={LogInIcon} alt="icon-succes" style={{ width: 300 }} />
								</Flex>
							</Modal>
						</>
					)}
				</Form>
			</Card>
		</div>
	)
}
