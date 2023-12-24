import { Box, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import React from 'react'
import NavBar from '../layout/NavBar';
import Sidebar from '../layout/Sidebar';
import { useState } from 'react';
import Step1 from './Step/Step1';
import { useParams } from 'react-router-dom';
import Step2 from './Step/Step2';
import Step3 from './Step/Step3';

const stepStyle = {
  mb: '5%',
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
  const { id } = useParams();
  console.log('id: ', id)
  const steps = ['Giới thiệu khóa học', 'Chương trình giảng dạy', 'Câu hỏi ôn tập'];
  const [completed, setCompleted] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "24px" }} display='flex' flexDirection='column' alignItems='center'>
          <Box sx={{ width: '80%', top: '5%', position: 'sticky', zIndex: '1000' }}>
            <Stepper nonLinear activeStep={activeStep} sx={stepStyle}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton key={label} onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>

              ))}
            </Stepper>
            {activeStep === 0 ? (<Step1 id={id} />) : ('')}
            {activeStep === 1 ? (<Step2 id={id} />) : ('')}
            {activeStep === 2 ? (<Step3 id={id} />) : ('')}
          </Box>
        </Box>
      </Box>
    </>

  )
}

export default Preview