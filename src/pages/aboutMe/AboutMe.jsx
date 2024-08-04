import { Flex } from 'antd'
import React from 'react'

export const AboutMe = () => {
	return (
		<>
			<Flex justify="center" align='center' style={{marginTop: 30}}>
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDNajgNyRBO7V-ow02dgPNtuWi5WvAoS0iGA&s"
					alt="myImage"
					style={{ borderRadius: 15, height: 300 }}
				/>
				<div>
					<h1 style={{ fontSize: 35, textAlign: 'right' }}>Hi, i'm Yohanes Raka Nugroho</h1>
					<p style={{ fontSize: 25, marginTop: -20, textAlign: 'right' }}>Develop with big dreams and efforts</p>
					<p style={{ fontSize: 13, textAlign: 'right',marginLeft: 100, marginTop: 30}}>
						Saya adalah seorang mahasiswa yang selalu tertarik untuk mengeksplorasi hal-hal baru, terutama di bidang
						teknologi. Sejak SMA, saya telah aktif dalam mempelajari berbagai keterampilan, mulai dari pemrograman
						hingga desain grafis. Ketertarikan saya pada teknologi mendorong saya untuk selalu belajar dan mencoba
						hal-hal baru, yang tercermin dalam berbagai proyek yang telah saya kerjakan. Saya percaya bahwa dengan terus
						bereksplorasi dan mengembangkan keterampilan, saya dapat berkontribusi lebih banyak dalam dunia teknologi
						dan menciptakan solusi inovatif untuk berbagai tantangan yang ada.
					</p>
				</div>
			</Flex>

			
		</>
	)
}
