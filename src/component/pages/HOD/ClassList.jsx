import React from 'react'
import { Box } from '@mui/material'
import Sidebar from './layout/Sidebar'
import NavBar from './layout/NavBar'

const ClassList = () => {
  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <h1>Class List</h1>
        </Box>
      </Box>
    </div>


  )
}

export default ClassList