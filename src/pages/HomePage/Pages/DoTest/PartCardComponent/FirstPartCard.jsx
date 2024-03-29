import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

const optionLecter = ['A', 'B', 'C', 'D', 'E']
const FirstPartCard = ({
  ques,
  indexQues,
  userAnswer,
  hanldeAddAnswer
}) => {
  const [value, setValue] = React.useState(userAnswer);
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value)
    hanldeAddAnswer(ques.questionId, event.target.value)
  };
  return (
    <Box display='flex' mt='1%' ml='4%'>
      <img width='40%' height='auto' src={ques.image} />
      <FormControl sx={{ width: '60%', ml: '3%' }}>
        {/* <FormLabel> */}
        <Box display='flex' width='100%' alignContent='center' alignItems='center'>
          <Button variant='outlined' sx={{ mr: '1%', borderRadius: '60%' }}>
            <Typography fontSize='23px' fontWeight='600'>
              {indexQues}
            </Typography>
          </Button>
          <Typography fontSize='23px' fontWeight='600'>
            {ques.description}
          </Typography>
        </Box>

        {/* </FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          sx={{
            ml: '7%'
          }}
        >
          {
            ques.questionAnswers.map((answer, index) => (
              <FormControlLabel
                value={answer.answer}
                control={<Radio />}
                label={<span style={{ fontSize: '20px' }}>{optionLecter[index] + '. ' + answer.answer}</span>}
              />
            ))
          }
        </RadioGroup>
      </FormControl>

    </Box>
  )
}

export default FirstPartCard