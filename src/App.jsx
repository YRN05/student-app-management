import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RouteManagement } from './routeManagements/RouteManagement'

const App = () => {
  return (
    <BrowserRouter>
      <RouteManagement/>
    </BrowserRouter>
  )
}

export default App