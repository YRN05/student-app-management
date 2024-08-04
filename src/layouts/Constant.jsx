import { HomeOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import { AboutMe } from '../pages/aboutMe/AboutMe'

export const HEADER_MENU = [
	{
		label: 'Home Page',
		icon: <HomeOutlined />,
		path: '/',
		key: '/',
	},
	{
		label: 'Student List',
		icon: <UsergroupAddOutlined />,
		path: '/student-list',
		key: '/student-list',
	},
	{
		label: 'About Me',
		icon: <UserOutlined />,
		path: '/about-me',
		key: '/about-me',
	},
]