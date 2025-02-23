import { Column, Pie } from "@ant-design/plots"
import { Card, Col, Row } from "antd"
import React, { useEffect } from "react"
import { removeDuplicates } from "../../utils/removeDuplicates"
import "./homePage.css"
import { useGetAllStudent } from "./hooks/useDashboard"

export const HomePage = () => {
	const [isLoading, data, getData] = useGetAllStudent()

	const allStudentByMajor = removeDuplicates(
		data?.map((item) => ({
			type: item.major,
			value: data?.filter((value) => value.major === item.major).length,
		})),
		"type",
	)

	const allStudentByClass = removeDuplicates(
		data
			?.sort((a, b) => (a.class > b.class ? 1 : -1))
			// 1 for ascending, -1 for descending
			?.map((item) => ({
				type: item.class,
				value: data?.filter((value) => value.class === item.class).length,
			})),
		"type",
	)

	console.log(allStudentByClass)

	const configStudentDataByMajor = {
		data: allStudentByMajor,
		angleField: "value",
		colorField: "type",
		label: {
			text: "value",
			style: {
				fontWeight: "bold",
				fontSize: "20px",
			},
		},
		legend: {
			color: {
				title: false,
				position: "right",
				rowPadding: 5,
			},
		},
	}

	const configStudentDataByClass = {
		data: allStudentByClass,
		xField: "type",
		yField: "value",
		style: {
			fill: ({ type }) => {
				if (type === "10-30分" || type === "30+分") {
					return "#22CBCC"
				}
				return "#2989FF"
			},
		},
		label: {
			text: (originData) => {
				const val = parseFloat(originData.value)
				if (val < 0.05) {
					return (val * 100).toFixed(1) + "%"
				}
				return ""
			},
			offset: 10,
		},
		legend: false,
	}

	useEffect(() => {
		getData() // ambil semua data biodata ketika HomePage di-mounting
	}, [])

	return (
		<>
			<h1>Home Page</h1>
			<Row gutter={20}>
				<Col span={12}>
					<Card title="Student Major Data" style={{ height: "100vh" }}>
						<Pie {...configStudentDataByMajor} />
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Student Class Data" style={{ height: "100vh" }}>
						<Column {...configStudentDataByClass} />
					</Card>
				</Col>
			</Row>
		</>
	)
}
