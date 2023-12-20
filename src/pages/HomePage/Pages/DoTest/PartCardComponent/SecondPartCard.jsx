import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
const optionLecter = ['A', 'B', 'C', 'D']
const SecondPartCard = ({
  ques,
  listAnswer
}) => {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  return (
    <Box display='flex' mt='1%' ml='4%'>
      <FormControl sx={{ width: '60%', ml: '3%' }}>
        {/* <FormLabel> */}
        <Typography fontSize='23px' fontWeight='600'>
          {ques.question}
        </Typography>
        {/* </FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
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

export default SecondPartCard