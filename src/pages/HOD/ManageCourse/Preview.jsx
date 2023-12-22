import { Box, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import React from 'react'
import NavBar from '../layout/NavBar';
import Sidebar from '../layout/Sidebar';
import { useState } from 'react';

const stepStyle = {
  ml: '14%',
  "& .MuiStepIcon-root": {
    fontSize: "2.5rem",
    margin: "0.5rem",
  },
  "& .MuiStepConnector-root": {
    margin: "1rem",
  },
  "& .MuiStepLabel-label": {
    fontSize: '18px'
  }
}
const Preview = () => {
  const steps = ['Giới thiệu khóa học', 'Chương trình giảng dạy', 'Câu hỏi ôn tập'];
  const [completed, setCompleted] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex', height: '300vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "24px" }} display='flex' flexDirection='column'>
          <Box sx={{ mt: '5%', width: '80%', top: '10%', position: 'sticky', zIndex: '1000' }}>
            <Stepper nonLinear activeStep={activeStep} sx={stepStyle}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton key={label} onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>

              ))}
            </Stepper>
          </Box>
        </Box>
      </Box>
    </>

  )
}

export default Preview