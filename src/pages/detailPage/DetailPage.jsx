import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetDetailBiodata } from './hooks/useDetailBiodatas'
import { useEffect } from 'react'
import { Button, Card, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { DefaultProfile } from '../../assets'
import { Flex } from 'antd'
import { GapComponent } from '../../components/gapComponent/GapComponent'
const { Meta } = Card

export const DetailPage = () => {
	const { id } = useParams()
	const [isLoadingBiodata, biodata, getDetailBiodata] = useGetDetailBiodata()
	useEffect(() => {
		getDetailBiodata(id)
	}, [])
	console.log(biodata)
	const navigate = useNavigate()

	return (
		<>
			<Flex justify="space-between" align="center">
				<h1>Detail Student</h1>
				<Button
					type="primary"
					icon={<EditOutlined />}
					size="large"
					shape="round"
					onClick={() => navigate(`/edit-student/${id}`)}
				>
					Edit
				</Button>
			</Flex>

			{isLoadingBiodata ? (
				<div>Loading</div>
			) : (
				<Row gutter={5}>
					<Col span={8}>
						<Card>
							<Flex justify="space-evenly" align="center" vertical>
								<img src={biodata[0]?.photo || DefaultProfile} style={{ width: 348, borderRadius: 5 }} />
								<h2>{`${biodata[0]?.firstName} ${biodata[0]?.lastName}`}</h2>
							</Flex>
						</Card>
					</Col>
					<Col span={16}>
						<Card
							style={{ padding: 10, fontSize: 16 }}
							// cover={<img alt="Student-photo" src={biodata[0]?.photo} />}
						>
							<h3>Nama Lengkap: {`${biodata[0]?.firstName} ${biodata[0]?.lastName}`}</h3>
							<p>Kelas: {biodata[0]?.kelas}</p>
							<p>Alamat: {biodata[0]?.address}</p>
							<p>Umur: {biodata[0]?.age}</p>
							<p>NIS: {biodata[0]?.nis}</p>
							<p>Jenis Kelamin: {biodata[0]?.gender}</p>
							<p>Nomor Telfon: {biodata[0]?.phoneNumber}</p>
							<p>Tanggal Lahir: {biodata[0]?.dateOfBirth}</p>
							<p>Tempat Lahir: {biodata[0]?.placeOfBirth}</p>
						</Card>
					</Col>
				</Row>
			)}

			<GapComponent height={10} />

			<Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
		</>
	)
}
