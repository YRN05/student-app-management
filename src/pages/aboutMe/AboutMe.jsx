import { Flex } from 'antd'
import React from 'react'
import './aboutMe.css'
import { FotoYohan } from '../../assets'

export const AboutMe = () => {
	return (
		<>
			<Flex justify="center" align="flex-start" style={{ marginTop: 30 }}>
				<img src={FotoYohan} alt="myImage" style={{ borderRadius: 15, height: 500 }} />
				<Flex vertical="horizontal" style={{ marginLeft: 10 }}>
					<div>
						<h1 className="poppins-bold" style={{ fontSize: 48, textAlign: 'left', fontFamily: 'Poppins' }}>
							Hi, i'm Yohanes Raka Nugroho
						</h1>

						<p className="sub-heading" style={{ fontSize: 25, textAlign: 'left', marginTop: -40 }}>
							Develop with big dreams and efforts
						</p>
					</div>

					<p className="desc" style={{ fontSize: 20, textAlign: 'left', marginTop: 40 }}>
						Saya adalah seorang mahasiswa yang selalu tertarik untuk mengeksplorasi hal-hal baru, terutama di bidang
						teknologi. Sejak SMA, saya telah aktif dalam mempelajari berbagai keterampilan, mulai dari pemrograman
						hingga desain grafis. Ketertarikan saya pada teknologi mendorong saya untuk selalu belajar dan mencoba
						hal-hal baru, yang tercermin dalam berbagai proyek yang telah saya kerjakan. Saya percaya bahwa dengan terus
						bereksplorasi dan mengembangkan keterampilan, saya dapat berkontribusi lebih banyak dalam dunia teknologi
						dan menciptakan solusi inovatif untuk berbagai tantangan yang ada.
					</p>
				</Flex>
			</Flex>
		</>
	)
}
