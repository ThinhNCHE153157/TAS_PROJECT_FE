import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

const optionLecter = ['A', 'B', 'C', 'D']
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
    hanldeAddAnswer(ques.id, event.target.value)
  };
  return (
    <Box display='flex' mt='1%' ml='4%'>
      <img width='40%' height='auto' src='https://umaine.edu/edhd/wp-content/uploads/sites/54/2023/03/Teacher-burnout-news-feature.jpg' />
      <FormControl sx={{ width: '60%', ml: '3%' }}>
        {/* <FormLabel> */}
        <Box display='flex' width='100%' alignContent='center' alignItems='center'>
          <Button variant='outlined' sx={{ mr: '1%', borderRadius: '60%' }}>
            <Typography fontSize='23px' fontWeight='600'>
              {indexQues}
            </Typography>
          </Button>
          <Typography fontSize='23px' fontWeight='600'>
            {ques.question}
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
            ques.options.map((option, index) => (
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={<span style={{ fontSize: '20px' }}>{optionLecter[index] + '. ' + option}</span>}
              />
            ))
          }
        </RadioGroup>
      </FormControl>

    </Box>
  )
}

export default FirstPartCard