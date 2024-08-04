import { Button, Mentions } from 'antd'
import { Menu } from 'antd'
import { Layout } from 'antd'
import React from 'react'
import { Suspense } from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { HEADER_MENU } from './Constant'
import { ConfigProvider } from 'antd'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Avatar } from 'antd'
import { Flex } from 'antd'
import { Dropdown } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { Sider, Header, Content, Footer } = Layout

export const PublickLayout = () => {
	// status collapsing
	const [collapsed, setCollapsed] = useState(false) 

	const location = useLocation()
	const userData = JSON.parse(localStorage.getItem('userData'))

	// to display the inial username by taking the first character from email
	const initial = userData?.email.substring(0, 1)?.toUpperCase()
	
	const navigate = useNavigate()

	// handling logout action
	const handleLogOut = () => {
		localStorage.removeItem('userData')
		navigate("/auth")
	}

	// contaning item when profile dropdown
	const items = [
		{
			label: userData?.email,
			key: 0,
		},
		{
			type: 'divider',
		},
		{
			label: (
				<a onClick={handleLogOut}>
					<Flex justify='center'>
						<LogoutOutlined style={{ marginRight: 10 }} />
						Log Out
					</Flex>
				</a>
			),
			key: 1,
			danger: true,
		},
	]

	return (
		<ConfigProvider
			theme={{
				components: {
					Menu: {
						itemSelectedColor: '#EEEEEE',
					},
				},
			}}
		>
			<Layout
				style={{
					minHeight: '100vh',
				}}
			>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
					theme="light"
					style={{ position: 'fixed', height: '100vh' }}
				>
					<div
						style={{
							padding: 20,
							textAlign: 'center',
							backgroundColor: '#EEEEEE',
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
						marginLeft: collapsed ? 80 : 200,
					}}
				>
					<Header
						style={{
							padding: 0,
							backgroundColor: '#31363F',
						}}
					>
						<Flex justify="flex-end" align="center">
							<Dropdown menu={{ items }} trigger={['click']}>
								<a onClick={(e) => e.preventDefault()}>
									<Avatar
										style={{
											backgroundColor: '#f56a00',
											verticalAlign: 'middle',
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
						</Flex>
					</Header>
					<Content
						style={{
							margin: '0 16px',
						}}
					>
						<Suspense>
							<Outlet />
						</Suspense>
					</Content>
					<Footer
						style={{
							textAlign: 'center',
						}}
					>
						Student App{new Date().getFullYear()} Created by Yohanes Raka Nugroho
					</Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	)
}
