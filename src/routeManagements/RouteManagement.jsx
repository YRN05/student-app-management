import React from "react"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import { HomePage } from "../pages/homePage/HomePage"
import { DetailPage } from "../pages/detailPage/DetailPage"
import { LoginPage } from "../pages/loginPage/LoginPage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PublickLayout } from "../layouts/PublickLayout"
import { AboutMe } from "../pages/aboutMe/AboutMe"
import { StudentList } from "../pages/studentList/StudentList"
import { AddStudent } from "../pages/addStudent/AddStudent"
import { EditStudent } from "../pages/editStudent/EditStudent"
import { Absen } from "../pages/absen/Absen"
import { UserManagement } from "../pages/userManagement/UserManagement"

export const RouteManagement = () => {
	const userData = JSON.parse(localStorage.getItem("userData"))
	const navigate = useNavigate()

	// akan berjalan jika depenesi "[]" valuenya berubah
	useEffect(() => {
		if (!userData) navigate("/auth")
	}, [userData])
	return (
		<Routes>
			<Route path="/auth" element={<LoginPage />} />
			<Route element={<PublickLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/detail/:id" element={<DetailPage />} />
				<Route path="/about-me" element={<AboutMe />} />
				<Route path="/student-list" element={<StudentList />} />
				<Route path="/add-student" element={<AddStudent />} />
				<Route path="/edit-student/:id" element={<EditStudent />} />
				<Route path="/absen-student/" element={<Absen />} />
				<Route path="/user-management/" element={<UserManagement />} />
			</Route>
		</Routes>
	)
}
