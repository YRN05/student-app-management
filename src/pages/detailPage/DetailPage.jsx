import React from "react"
import { useParams } from "react-router-dom"
import { useDeleteBiodata, useGetDetailBiodata } from "./hooks/useDetailBiodatas"
import { useEffect } from "react"
import { Button, Card, Col, Row } from "antd"
import { useNavigate } from "react-router-dom"
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { DefaultProfile } from "../../assets"
import { Flex } from "antd"
import { GapComponent } from "../../components/gapComponent/GapComponent"
import { Modal } from "antd"
const { Meta } = Card

export const DetailPage = () => {
	const { id } = useParams()
	const [isLoadingBiodata, biodata, getDetailBiodata] = useGetDetailBiodata()
	const [isLoading, deleteBiodata] = useDeleteBiodata()
	const [modal, contextHolder] = Modal.useModal()

	useEffect(() => {
		getDetailBiodata(id)
	}, [])
	console.log(biodata)
	const navigate = useNavigate()

	const studentBiodata = biodata ? biodata : null

	const handleDelete = () => {
		modal.confirm({
			title: "Are you sure you want to delete this student?",
			content: "Once deleted, you will not be able to recover this data.",
			okText: "Yes",
			cancelText: "No",
			onOk: () => deleteBiodata(id, () => navigate(-1)),
			onCancel() {},
			centered: true,
		})
	}
	return (
		<>
			<Flex justify="space-between" align="center">
				<h1>Detail Student</h1>
				<Flex justify="flex-end">
					<Button
						type="primary"
						icon={<EditOutlined />}
						size="large"
						shape="round"
						onClick={() => navigate(`/edit-student/${id}`)}
					>
						Edit
					</Button>
					<Button
						loading={isLoading}
						icon={<DeleteOutlined />}
						size="large"
						type="primary"
						danger
						onClick={handleDelete}
					>
						Delete
					</Button>
				</Flex>
			</Flex>

			{isLoadingBiodata && biodata?.length === 0 ? (
				<div>Loading</div>
			) : (
				<Row gutter={5}>
					<Col span={8}>
						<Card>
							<Flex justify="space-evenly" align="center" vertical>
								<img src={studentBiodata?.photo_url || DefaultProfile} style={{ width: 348, borderRadius: 5 }} />
								<h2>{`${studentBiodata?.first_name} ${studentBiodata?.last_name}`}</h2>
							</Flex>
						</Card>
					</Col>
					<Col span={16}>
						<Card
							style={{ padding: 10, fontSize: 16 }}
							// cover={<img alt="Student-photo" src={studentBiodata?.photo} />}
						>
							<h3>Nama Lengkap: {`${studentBiodata?.first_name} ${studentBiodata?.last_name}`}</h3>
							<p>Kelas: {studentBiodata?.class}</p>
							<p>Alamat: {studentBiodata?.address}</p>
							<p>Umur: {studentBiodata?.age}</p>
							<p>NIS: {studentBiodata?.nis}</p>
							<p>Jenis Kelamin: {studentBiodata?.gender}</p>
							<p>Nomor Telfon: {studentBiodata?.phone_number}</p>
							<p>Tanggal Lahir: {studentBiodata?.date_of_birth}</p>
							<p>Tempat Lahir: {studentBiodata?.place_of_birth}</p>
						</Card>
					</Col>
				</Row>
			)}

			<GapComponent height={10} />

			<Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
			{contextHolder}
		</>
	)
}
