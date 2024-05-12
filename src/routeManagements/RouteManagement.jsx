import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { HomePage } from '../pages/homePage/HomePage'

export const RouteManagement = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
    </Routes>
  )
}
