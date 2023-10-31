import { Box, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import Sidebar from '../layout/Sidebar';

const ClassDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, m: 2 }}>

          <Typography
            variant="h3"
            component="h3"
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}
          >
            Class Detail
          </Typography>
          <Box sx={{ height: 50 }} />

        </Box>
      </Box>
    </div >
  )
}

export default ClassDetail