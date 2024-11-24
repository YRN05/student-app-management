import React from "react"
import { useGetBiodata } from "./hooks/useBiodatas"
import { useEffect } from "react"
import { Button, Col, Collapse, Form, Pagination, Row, Select, Space } from "antd"
import { Card } from "antd"
import "./studentList.css"
import { Link } from "react-router-dom"
import { Input } from "antd"
import { CalendarOutlined, CaretRightOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons"
import { GapComponent } from "../../components/gapComponent/GapComponent"
import { useState } from "react"
import { Flex } from "antd"
import { useNavigate } from "react-router-dom"
import { AddStudent } from "../addStudent/AddStudent"
import { DefaultProfile } from "../../assets"
import { Radio } from "antd"
import { Children } from "react"
import { Divider } from "antd"
import { Empty } from "antd"
import { Modal } from "antd"
import { Absen } from "../absen/Absen"
const { Meta } = Card

export const StudentList = () => {
	// import hooks
	const [isLoadingBiodata, biodata, getBiodata] = useGetBiodata()
	const [data = biodata, setData] = useState()

	// for pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [minValue, setMinValue] = useState(0)
	const [maxValue, setMaxValue] = useState(12)
	const [sort, setSort] = useState("creted-at")

	const [sortClass, setSortClass] = useState()
	const [filterJurusan, setFilterJurusan] = useState()
	const [filterGender, setFilterGender] = useState()

	const [search, setSearch] = useState()

	const [isModalOpen, setIsModalOpen] = useState(false)

	// for change "userData" data to JSON shape data
	const userData = JSON.parse(localStorage.getItem("userData"))
	const navigate = useNavigate()

	useEffect(() => {
		getBiodata()
	}, [])

	const sorterOpion = [
		{ label: <CalendarOutlined />, value: "creted-at" },
		{ label: "A-Z", value: "a-z" },
		{ label: "Z-A", value: "z-a" },
	]

	const classSorter = [
		{ label: "10", value: 10 },
		{ label: "11", value: 11 },
		{ label: "12", value: 12 },
	]

	const onSorter = (e) => {
		setSort(e.target.value)
		handleSearch("sorter", e.target.value)
	}

	const onFilterByClass = (e) => {
		setSortClass(e.target.value)
		handleSearch("filter-by-class", e.target.value)
	}

	const onSearch = (e) => {
		setSearch(e.target.value)
		handleSearch("search", e.target.value)
	}

	const handleFilter = (values) => {
		if (values.class) {
			setSortClass(values.class)
			handleSearch("filter-by-class", values.class)
		} else if (values.major) {
			setFilterJurusan(values.major)
			handleSearch("filter-by-jurusan", values.major)
		} else {
			setFilterGender(values.gender)
			handleSearch("filter-by-gender", values.gender)
		}
	}

	const handleSearch = (type, value) => {
		// define value
		const searchValue = type === "search" ? value : search
		const classValue = type === "filter-by-class" ? value : sortClass
		const jurusanValue = type === "filter-by-jurusan" ? value : filterJurusan
		const genderValue = type === "filter-by-gender" ? value : filterGender
		const sorterValue = type === "sorter" ? value : sort

		const searchAndFilter = () => {
			// search algoritma
			const filteredBiodata = biodata?.filter((item) => {
				const fullName = `${item.first_name} ${item.last_name}`

				// search by name
				const isMatchName = searchValue ? fullName.toLowerCase().includes(searchValue.toLowerCase()) : true

				// search by address
				const isMatchAddress = searchValue ? item.address.toLowerCase().includes(searchValue.toLowerCase()) : true

				// filter by class
				const studentClass = item.class
				const isMatchByClass = classValue ? studentClass.toLowerCase().includes(classValue.toLowerCase()) : true

				// filter by jurusan
				const jurusan = item.major
				const isMatchByJurusan = jurusanValue ? jurusan.toLowerCase().includes(jurusanValue.toLowerCase()) : true

				// filter by gender
				const gender = item.gender
				const isMatchByGender = genderValue ? gender.toLowerCase() === genderValue.toLowerCase() : true

				return (isMatchName || isMatchAddress) && isMatchByClass && isMatchByJurusan && isMatchByGender
			})

			if (sorterValue === "creted-at") {
				filteredBiodata?.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
			} else if (sorterValue === "a-z") {
				filteredBiodata?.sort((a, b) => (a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1))
			} else {
				filteredBiodata?.sort((a, b) => (a.first_name.toLowerCase() > b.first_name.toLowerCase() ? -1 : 1))
			}
			return filteredBiodata
		}

		setData(searchAndFilter())
	}

	const total = data?.length
	const handlePagination = (value) => {
		setCurrentPage(value)
		setMinValue((value - 1) * 12)
		setMaxValue(value * 12)
	}

	const [form] = Form.useForm()

	const resetFilter = () => {
		setSortClass()
		setFilterJurusan()
		setFilterGender()
		setSearch("")
		form?.resetFields()
		setData(biodata)
	}

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const items = [
		{
			key: "1",
			label: (
				<Flex>
					<Input prefix={<SearchOutlined />} placeholder="Search" value={search} onChange={onSearch} />
				</Flex>
			),
			children: (
				<Form form={form} name="filter" onValuesChange={handleFilter} layout="vertical">
					<Row gutter={8}>
						<Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
							<Form.Item label="Class" name="class">
								<Select
									placeholder="Class"
									onChange={(value) => setSortClass(value)}
									options={[
										{
											value: "10",
											label: "10",
										},
										{
											value: "11",
											label: "11",
										},
										{
											value: "12",
											label: "12",
										},
									]}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
							<Form.Item label="Jurusan" name="major">
								<Select
									onChange={(value) => setFilterJurusan(value)}
									placeholder="Jurusan"
									options={[
										{
											value: "IPA",
											label: "Ipa",
										},
										{
											value: "IPS",
											label: "Ips",
										},
									]}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
							<Form.Item label="Gender" name="gender">
								<Select
									onChange={(value) => setFilterGender(value)}
									placeholder="Gender"
									options={[
										{
											value: "Male",
											label: "Male",
										},
										{
											value: "Female",
											label: "Female",
										},
									]}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Button onClick={resetFilter}>Reset Filter</Button>
				</Form>
			),
		},
	]

	const handleNotPresent = () => {
		navigate("/absen-student/")
	}

	return (
		<>
			{/* displaying email user as account name */}
			

			{/* Penggunaan GapComponent */}
			<GapComponent height={15} />
			<Flex justify="flex-end">
				<Button
					style={{ marginBottom: 10 }}
					icon={<UserAddOutlined />}
					type="primary"
					onClick={() => navigate("/add-student")}
				>
					Add Student
				</Button>
			</Flex>

			{/* Search Bar And Sorter*/}

			<Card styles={{ body: { padding: 0 } }}>
				<Collapse
					items={items}
					expandIconPosition="end"
					ghost
					collapsible="icon"
					expandIcon={({ isActive }) => (
						<Button
							icon={<CaretRightOutlined rotate={isActive ? 90 : 0} />}
							iconPosition="end"
							style={{ marginTop: 9, color: "white" }}
							type="primary"
						>
							Filter
						</Button>
					)}
				/>
				<Divider style={{ marginTop: 0, marginBottom: 0 }} />
				<Flex style={{ margin: 17 }} gap={10} vertical>
					<p style={{ margin: 3 }}>Sort by:</p>
					<Radio.Group options={sorterOpion} onChange={onSorter} value={sort} optionType="button" buttonStyle="solid" />
					<Button style={{ width: 100 }} danger onClick={handleNotPresent}>
						Not Present
					</Button>
				</Flex>
			</Card>

			<GapComponent height={10} />

			<Row gutter={[20, 20]}>
				{/* if 'isLoadingBiodata'true = displaying loading status */}
				{isLoadingBiodata ? (
					<div style={{ color: "black" }}>Loading...</div>
				) : data?.length === 0 ? (
					<Col span={24}>
						<Flex align="center" justify="center" style={{ height: "30vh" }}>
							<Empty />
						</Flex>
					</Col>
				) : (
					data?.slice(minValue, maxValue).map((item) => (
						<Col key={item.id} xs={24} sm={24} md={24} lg={12} xl={8}>
							<Link to={`/detail/${item.id}`}>
								{/* the data */}
								<Card className="card-style" hoverable={true}>
									<Flex vertical gap={20}>
										<Flex gap={20} justify="space-evenly" align="center">
											<img
												alt="Student-Profile-Picture"
												style={{ width: 150, borderRadius: 15 }}
												src={item.photo_url || DefaultProfile}
											/>
											<Space direction="vertical">
												<h2 style={{ margin: 0 }}>{`${item.first_name} ${item.last_name}`}</h2>
												<p style={{ margin: 0 }}>Kelas: {item.class}</p>
												<p style={{ margin: 0 }}>Address: {item.address}</p>
												<p style={{ margin: 0 }}>Gender: {item.gender}</p>
											</Space>
										</Flex>
										<Flex align="center" justify="space-evenly"></Flex>
									</Flex>
								</Card>
							</Link>
						</Col>
					))
				)}
			</Row>
			<GapComponent height={10} />
			<Flex justify="center">
				<Pagination
					defaultCurrent={1}
					total={total}
					pageSize={12}
					onChange={handlePagination}
					showTotal={(total) => `Total data: ${total}`}
				/>
			</Flex>
		</>
	)
}
