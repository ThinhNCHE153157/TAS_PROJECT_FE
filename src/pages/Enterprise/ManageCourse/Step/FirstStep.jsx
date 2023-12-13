import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import TextEditor from '../../../../component/TextEditor'
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Divider } from 'antd';

const FirstStep = ({
  onClickNext,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleNext = () => {
    onClickNext();
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box width='100%'>
      <Typography fontSize='30px' fontWeight='500'>
        Giới thiệu khóa học
      </Typography>
      <Box mt='3%' bgcolor='white'>
        <Box display='flex' flexDirection='column' ml='3%' >

          <Typography
            fontSize='22px'
            fontWeight='bold'
            sx={{ marginTop: '5%' }}
          >
            Tiêu đề khóa học
          </Typography>
          <TextField
            sx={{
              width: '90%',
              marginTop: '1%',
              '& .MuiInputBase-input': {
                fontSize: '20px', // Tăng kích thước của chữ trong TextField
              },
              '& .MuiFormHelperText-root': {
                fontSize: '18px', // Tăng kích thước của chữ trong helperText
              },
            }}

            placeholder='Tiêu đề khóa học'
            helperText="* Tiêu đề tối thiểu 10 kí tự và tối đa 200 ký tự"
          />

          <Typography
            fontSize='22px'
            fontWeight='bold'
            sx={{ marginTop: '2%' }}
          >
            Giới thiệu ngắn
          </Typography>
          <TextField
            sx={{
              width: '90%',
              marginTop: '1%',
              '& .MuiInputBase-input': {
                fontSize: '20px', // Tăng kích thước của chữ trong TextField
              },
              '& .MuiFormHelperText-root': {
                fontSize: '18px', // Tăng kích thước của chữ trong helperText
              },
            }}
            placeholder='Giới thiệu ngắn'
            helperText="* Giới thiệu tối thiểu 50 kí tự tối đa 500 kí tự"
          />

          <Typography fontSize='22px' fontWeight='bold' sx={{ marginTop: '2%' }}>
            Mô tả khóa học
          </Typography>
          <TextEditor />

          <Typography fontSize='22px' fontWeight='bold' sx={{ marginTop: '2%' }}>
            Học được gì sau khóa học ?
          </Typography>
          <TextEditor />
          <Box width='90%' display='flex' mt='2%'>
            <Box width='45%'>
              <Typography fontSize='22px' fontWeight='bold' sx={{ marginTop: '2%' }}>
                Trình độ khóa học
              </Typography>
            </Box>
            <Box width='50%'>
              <Typography fontSize='22px' fontWeight='bold' sx={{ marginTop: '2%' }}>
                Chọn hình khóa học
              </Typography>
              <Typography fontSize='18px' color='rgba(0, 0, 0, 0.6)'>
                * Bạn nên chọn khung ảnh có tỉ lệ 1x1
              </Typography>
              <Box style={{ padding: '20px', textAlign: 'center' }}>
                {selectedImage && (
                  <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Typography variant="h6" gutterBottom>
                    </Typography>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', height: '300px' }} />
                  </div>
                )}
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-input"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-input">
                  <Button component="span" variant="contained" color="primary" sx={{ fontSize: '15px' }}>
                    Choose Image
                  </Button>
                </label>

              </Box>
            </Box>
          </Box>
          <Divider />
          <IconButton sx={{ m: '0 auto', bgcolor: 'green', borderRadius: '5px', width: '180px', mb: '5%' }}>
            <SaveIcon sx={{ color: 'white' }} />
            <Typography fontSize='22px' fontWeight='bold' color='white' ml='1%' >
              Cập nhật
            </Typography>
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ ml: '45%', mt: '3%' }}>
        <Button
          variant='contained'
          sx={{
            fontSize: '22px',
            mr: '8%',
            textTransform: 'none'
          }}
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
        >
          Next
        </Button>
      </Box>
    </Box >
  )
}

export default FirstStep