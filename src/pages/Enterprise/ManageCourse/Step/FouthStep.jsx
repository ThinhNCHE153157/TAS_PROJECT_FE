import { Box, Button, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { UpdatePrice } from '../../../../Services/ManageCourseService';
import { alertError, alertSuccess } from '../../../../component/AlertComponent';
import { ToastContainer } from 'react-toastify';

const FouthStep = ({
  onClickNext,
  onClickBack,
  id

}) => {
  const [price, setPrice] = useState(0)
  const [error, setError] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const handleNext = () => {
    onClickNext();
  }
  const handleBack = () => {
    onClickBack();
  }
  const handleOnChangePrice = (e) => {
    setPrice(e.target.value)
  }
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const isValid = (price) => {
    console.log('price:', price)
    console.log('isNaN:', isNaN(price))
    if (isNaN(price)) {
      return 'Giá bạn nhập không hợp lệ';
    }
    if (price < 50000) {
      return 'Giá khóa học tối thiểu là 50,000 VND';
    }
    return 'true';
  }
  const handleSave = () => {
    const isValidPrice = isValid(price);
    if (isValidPrice !== 'true') {
      setError(isValidPrice)
      setIsUpdate(false)
    } else {
      var rData = {
        courseId: id,
        price: price
      }
      UpdatePrice(rData).then(res => {
        alertSuccess('Cập nhật giá khóa học thành công')
        console.log(res)
        setError('')
        setIsUpdate(true)
      }).catch(err => {
        alertError('Cập nhật giá khóa học thất bại')
        console.log(err)
      })
    }
    var data = {
      courseId: id,
      price: price
    }
    console.log(data)
  }

  return (
    <>
      <ToastContainer />
      <Box width='100%'>

        <Typography fontSize='30px' fontWeight='500'>
          Giá khóa học
        </Typography>
        <Box display='flex' alignItems='center' mt='1%' justifyContent='flex-start'>
          <IconButton variant='text' >
            <ErrorOutlineIcon sx={{ color: 'red' }} />
            <Typography fontSize='18px' color='red' sx={{ ml: 1 }}>
              Lưu ý khi thêm khóa học (ấn vào để xem)
            </Typography>
          </IconButton>
        </Box>

        <Box mt='3%' bgcolor='white' display='flex' flexDirection='column'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '96%',
              margin: '0 auto',
              mt: '3%',
              bgcolor: '#ebf2f5',
              height: '100px',
              borderRadius: '5px'
            }}
          >
            <Typography variant="h4" fontSize="28px" fontWeight='500'>
              Giá của bạn khi đang bán
            </Typography>
          </Box>
          <Box ml='2%' mt='2%' >
            <Typography fontSize="23px" component='div'>
              Giá của khóa học*
            </Typography>
            <TextField
              onChange={handleOnChangePrice}
              component='div'
              sx={{
                mt: '1%',
                width: '25%',
                '& .MuiInputBase-input': {
                  fontSize: '20px', // Tăng kích thước của chữ trong TextField
                },
                '& .MuiFormHelperText-root': {
                  fontSize: '18px', // Tăng kích thước của chữ trong helperText
                  color: 'red'
                },
                '& .MuiInputLabel-root': {
                  fontSize: '20px', // Tăng kích thước của chữ trong InputLabel
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography fontSize='20px' fontWeight='600'>
                      VND
                    </Typography>
                  </InputAdornment>
                ),
              }}
              required
              multiline
              helperText="* Giá khóa học tối thiểu là 50,000 VND"

            />

            <Typography fontSize='20px' fontWeight='600'>
              Giá bán: {formatNumberWithCommas(price)}
            </Typography>
          </Box>
          <Divider />
          <Typography
            fontSize='20px'
            fontWeight='500'
            color='red'
            fontStyle='italic'
            m='0 auto'
          >
            {error}
          </Typography>
          <IconButton sx={{ m: '0 auto', bgcolor: 'green', borderRadius: '5px', width: '180px', mb: '5%' }}
            onClick={() => handleSave()}
          >
            <SaveIcon sx={{ color: 'white' }} />
            <Typography fontSize='22px' fontWeight='bold' color='white' ml='1%' >
              Cập nhật
            </Typography>
          </IconButton>
        </Box>

        <Box sx={{ ml: '45%', mt: '3%' }}>
          <Button
            variant='contained'
            sx={{
              fontSize: '22px',
              mr: '8%',
              textTransform: 'none'
            }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant='contained'
            sx={{
              fontSize: '22px',
              textTransform: 'none'
            }}
            onClick={handleNext}
            disabled={!isUpdate}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>


  )
}

export default FouthStep