import React from 'react'
import { Box, Button, IconButton, Step, StepLabel, Stepper, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import NavBar from '../layout/NavBar'
import AddCardTwoToneIcon from '@mui/icons-material/AddCardTwoTone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FirstStep from './Step/FirstStep';
import { useState } from 'react';
import SecondStep from './Step/SecondStep';
import ThirdStep from './Step/ThirdStep';
import FouthStep from './Step/FouthStep';
import FifthStep from './Step/FifthStep';
const RenderStepper = ({
  currentStep
}) => {
  const steps = ['Giới thiệu khóa học', 'Chương trình giảng dạy', 'Câu hỏi ôn tập', 'Giá khóa học', 'Xuất bản'];
  const stepStyle = {

    "& .MuiStepIcon-root": {
      fontSize: "2.5rem",
      margin: "0.5rem",
    },
    "& .MuiStepConnector-root": {
      margin: "1rem",
    }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentStep} alternativeLabel sx={stepStyle}>
        {steps.map((label) => (
          <Step key={label} sx={{ fontSize: '100px', width: '30%', height: '40px' }} >
            <StepLabel sx={{ fontSize: '20px' }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
const AddCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const onClickNext = (data) => {
    setCourseId(data);
    var newCur = currentStep + 1;
    setCurrentStep(newCur)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const onClickBack = () => {
    var newCur = currentStep - 1;
    setCurrentStep(newCur)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  console.log(courseId);
  return (
    <Box sx={{ backgroundColor: '#f5f3f0', }} width='100vw' height='300vh'>
      <NavBar />
      <Box display='flex' >
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, m: 2, }} >
          <Box display='flex' mt='5%' height='80px' width='95%' flexDirection='column'>
            <Box display='flex' width='95%'>
              <AddCardTwoToneIcon fontSize='large' />
              <Typography fontSize='25px' ml='1%'>
                Thêm khóa học mới
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' mt='2%' justifyContent='flex-start'>
              <IconButton variant='text' >
                <ErrorOutlineIcon sx={{ color: 'red' }} />
                <Typography fontSize='18px' color='red' sx={{ ml: 1 }}>
                  Lưu ý khi thêm khóa học (ấn vào để xem)
                </Typography>
              </IconButton>
            </Box>
            <Box sx={{ mt: '5%' }}>
              <RenderStepper currentStep={currentStep} />
            </Box>
            <Box width='95%' mt='5%' >
              {currentStep === 0 ? <FirstStep onClickNext={onClickNext} /> : ''}
              {currentStep === 1 ? <SecondStep onClickNext={onClickNext} id={courseId} onClickBack={onClickBack} /> : ''}
              {currentStep === 2 ? <ThirdStep onClickNext={onClickNext} onClickBack={onClickBack} /> : ''}
              {currentStep === 3 ? <FouthStep onClickNext={onClickNext} onClickBack={onClickBack} /> : ''}
              {currentStep === 4 ? <FifthStep onClickNext={onClickNext} /> : ''}
              {/* <FirstStep /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default AddCourse