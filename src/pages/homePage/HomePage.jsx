import React from 'react'
import { useGetBiodata } from './hooks/useBiodatas'
import { useEffect } from 'react'
import { Space } from 'antd'
import { Card } from 'antd'
import './homePage.css'

export const HomePage = () => {
	// import hooks
	const [isLoadingBiodata, biodata, getBiodata] = useGetBiodata()
	useEffect(() => {
		getBiodata()
	}, [])

	return (
		<>
			{biodata?.map((item, index) => (
				// <div key={index}>
				//     {item?.firstName}
				// </div>

				<Space direction="vertical" size={16} >
					<Card
                        hoverable={true}
                        key={index}
						title={item.firstName}
						style={{
							width: 300,
                            margin: 15
						}}
					>
                        <p>First name: {item.firstName}</p>
						<p> Last name: {item.lastName} </p>
						<p>Kelas: {item.kelas}</p>
						<p>Address: {item.address}</p>
					</Card>
				</Space>
			))}
		</>
	)
}
