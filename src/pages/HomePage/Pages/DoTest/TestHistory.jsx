import { Box, Typography } from '@mui/material'
import React from 'react'
import Header from '../../../../layout/Header'

const TestHistory = () => {
  return (
    <Box
      backgroundColor='#f3f6f9'
      minHeight='0'
      display='flex'
      flexDirection='column'
    >
      <Header />
      <Typography fontSize='30px' fontWeight='bold' m='0 auto' marginTop='5%' >
        Các bài thi đã làm
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>

      </Box>
    </Box>
  )
}

export default TestHistory