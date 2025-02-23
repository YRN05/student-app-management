import React from "react"
import { useLocation } from "react-router-dom"
import { HEADER_MENU } from "./Constant"
import { Typography } from "antd"

export const PageTitle = () => {
	const { pathname } = useLocation()

	const title = HEADER_MENU.find((e) => e.path === pathname)?.label
	const icon = HEADER_MENU.find((e) => e.path === pathname)?.icon

	return (
		<Typography.Title level={4} style={{ margin: 0, color: "white", marginLeft: 20 }}>
			{icon} {title}
		</Typography.Title>
	)
}
