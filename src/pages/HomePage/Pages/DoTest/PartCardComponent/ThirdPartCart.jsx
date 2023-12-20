import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react'

const ThirdPartCart = () => {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box display='flex' mt='1%' ml='4%'>
      <img width='40%' height='auto' src='' />
      <FormControl sx={{ width: '60%', ml: '3%' }}>
        {/* <FormLabel> */}
        <Typography fontSize='23px' fontWeight='600'>
          Câu hỏi ở đây
        </Typography>
        {/* </FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={<span style={{ fontSize: '21px' }}>Female</span>}
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={<span style={{ fontSize: '21px' }}>Male</span>}
          />
        </RadioGroup>
      </FormControl>

    </Box>
  )
}

export default ThirdPartCart