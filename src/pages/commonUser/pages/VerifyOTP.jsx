import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import Header from '../layout/Header'
import { useState } from 'react';
import { useRef } from 'react';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const handleChange = (index, value) => {
    // Ensure that the entered value is a number
    if (!isNaN(value) && value !== '') {
      // Use a temporary array to update the values
      const newOtp = [...otp];
      newOtp[index] = value;

      if (index < 3 && value !== '') {
        inputRefs[index + 1].current.focus();
      }

      // Update state with the temporary array
      setOtp(newOtp);

      const fullOtp = newOtp.join('');
      console.log('fullOtp:', fullOtp)
    }
  };

  return (
    <div>
      <Header />
      <Box
        width='100%'
        display='flex'
        height='900px'
        alignItems='center'
        justifyContent='center'
      >
        <Card
          sx={{
            width: '22%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid black'
          }}
          elevation={9}
        >
          <Box
            width='90%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            mt='5%'
          >
            <Typography fontSize='40px' fontWeight={'bold'}>Xác nhận tài khoản</Typography>
            <Typography fontSize='15px' mt='2%' mb='5%'>
              Chúng tôi đã gửi mã OTP xác nhận về địa chỉ email
              của bạn. Kiểm tra Email và điền xuống bên dưới
            </Typography>
            <Divider sx={{ height: '3px', bgcolor: 'gray', width: '100% ' }} />
            <form style={{ marginTop: '5%' }}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={inputRefs[index]}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    width: '3em',
                    textAlign: 'center',
                    margin: '0 0.5em',
                    '& .MuiInputBase-input': {
                      fontSize: '20px', // Tăng kích thước của chữ trong TextField
                      fontWeight: 'bold'
                    },
                  }}
                  inputProps={{
                    maxLength: 1,
                    pattern: '[0-9]*', // Allow only numbers
                  }}
                />
              ))}
            </form>
            <Button variant='text' sx={{ textTransform: 'none', mt: '6%' }}>
              <Typography fontSize='20px' fontStyle='initial'>Bạn không nhận được email </Typography>
            </Button>
            <Button variant='contained' sx={{ mt: '10%', bgcolor: '#4A3AFF', width: '100%', textTransform: 'none', padding: '20px 0px', borderRadius: '5px' }}>
              <Typography fontSize='20px' fontStyle='initial'>Đồng Ý </Typography>
            </Button>
            <Button variant='text' sx={{ textTransform: 'none', mt: '10%', mb: '12%' }}>
              <Typography fontSize='20px' >Trở về đăng nhập </Typography>
            </Button>
          </Box>

        </Card>
      </Box>
    </div >
  )
}

export default VerifyOTP