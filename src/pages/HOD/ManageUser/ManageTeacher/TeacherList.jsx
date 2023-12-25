import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import Sidebar from '../../layout/Sidebar'
import NavBar from '../../layout/NavBar'
import DataGridBase from '../../../../component/DataGridBase'

const TeacherList = () => {
  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <DataGridBase pageName='Teacher manager' columnsToSearch={['username']} />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default TeacherList