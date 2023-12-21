import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
const optionLecter = ['A', 'B', 'C', 'D']
const TestResultCard = ({
  ques,
  indexQues,
  userAnswer = '',
}) => {
  return (
    <Box display='flex' mt='1%' ml='4%'>
      {
        ques.img && (
          <img width='40%' height='auto' src='https://umaine.edu/edhd/wp-content/uploads/sites/54/2023/03/Teacher-burnout-news-feature.jpg' />
        )
      }
      <FormControl
        sx={{
          width: ques.img === null || ques.img === undefined || ques.img === '' ? '80%' : '60%',
          ml: '3%'
        }}
      >
        {/* <FormLabel> */}
        <Box display='flex' width='100%' alignContent='center' alignItems='center'>
          <Button variant='outlined' sx={{ mr: '1%', borderRadius: '60%' }}>
            <Typography fontSize='23px' fontWeight='600'>
              {indexQues}
            </Typography>
          </Button>
          <Box display='flex' justifyContent='space-between'>
            <Typography fontSize='23px' fontWeight='600'>
              {ques.question}
            </Typography>
            {
              ques.correctAnswer === userAnswer ? (
                <CheckOutlinedIcon sx={{ color: 'green', mr: '3%', fontSize: '30px' }} />
              ) : (
                <CloseOutlinedIcon sx={{ color: 'red', mr: '3%', fontSize: '30px' }} />
              )
            }
          </Box>

        </Box>

        {/* </FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={userAnswer}
          sx={{
            ml: '7%'
          }}
        >
          {
            ques.options.map((option, index) => (
              <FormControlLabel
                value={option}
                control={<Radio readOnly />}
                label={<span style={{ fontSize: '20px' }}>{optionLecter[index] + '. ' + option}</span>}
              />
            ))
          }
        </RadioGroup>
      </FormControl>

    </Box>
  )
}

export default TestResultCard