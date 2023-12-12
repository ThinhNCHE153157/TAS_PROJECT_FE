import React from 'react'
import { Box, Button, IconButton, Step, StepLabel, Stepper, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import NavBar from '../layout/NavBar'
import AddCardTwoToneIcon from '@mui/icons-material/AddCardTwoTone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const RenderStepper = () => {
  const steps = ['Giới thiệu khóa học', 'Chương trình giảng dạy', 'Giá khóa học', 'Câu hỏi ôn tập', 'Xuất bản'];
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel >
        {steps.map((label) => (
          <Step key={label} sx={{ fontSize: '100px', width: '33%', height: '40px' }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
const AddCourse = () => {
  return (
    <div>
      <NavBar />
      <Box display='flex '>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, m: 2 }}>
          <Box display='flex' mt='5%' height='80px' width='95%' flexDirection='column'>
            <Box display='flex' bgcolor='pink' width='95%'>
              <AddCardTwoToneIcon fontSize='large' />
              <Typography fontSize='25px' ml='1%'>
                Thêm khóa học mới
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' mt='2%' justifyContent='flex-start'>
              <IconButton variant='text' >
                <ErrorOutlineIcon sx={{ color: 'red' }} />
                <Typography fontSize='15px' color='red' sx={{ ml: 1 }}>
                  Lưu ý khi thêm khóa học (ấn vào để xem)
                </Typography>
              </IconButton>
            </Box>
            <Box sx={{ mt: '5%' }}>
              <RenderStepper />
            </Box>
          </Box>
        </Box>
      </Box>
    </div >
  )
}

export default AddCourse