import { Box, Button, FormControlLabel, InputLabel, Modal, Radio, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';

const options = ['A', 'B', 'C', 'D'];
const AddQuestion = ({
  isOpenModal,
  handleCloseModal,
  handleAdd
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleChangeOption = (event) => {
    console.log(event.target.value)
    setSelectedValue(event.target.value);

  };
  return (
    <Modal
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
        }}
      >
        <Box ml='2%'>
          <Typography id='modal-title' variant='h4' component='div'>
            Thêm câu hỏi mới
          </Typography>
          <Typography id='modal-description' sx={{ mt: 2 }} fontSize='23px'>
            Câu hỏi
          </Typography>
          <TextField
            // onChange={(value) => setValue(value)}
            component='div'
            sx={{
              mt: '1%',
              width: '97%',
              '& .MuiInputBase-input': {
                fontSize: '20px', // Tăng kích thước của chữ trong TextField
              },
              '& .MuiFormHelperText-root': {
                fontSize: '18px', // Tăng kích thước của chữ trong helperText
              },
              '& .MuiInputLabel-root': {
                fontSize: '20px', // Tăng kích thước của chữ trong InputLabel
              },
            }}
            label="Câu hỏi"
            required
            multiline
            rows={2}
          />

          <Box width='100%'>
            <Typography id='modal-description' sx={{ mt: 2 }} fontSize='23px'>
              Câu trả lời
            </Typography>
            {
              options.map((option, index) => (
                <Box display='flex' justifyContent='space-between' padding='5px'>
                  <TextField
                    // onChange={(value) => setValue(value)}
                    component='div'
                    sx={{
                      mt: '1%',
                      width: '80%',
                      '& .MuiInputBase-input': {
                        fontSize: '20px', // Tăng kích thước của chữ trong TextField
                      },
                      '& .MuiFormHelperText-root': {
                        fontSize: '18px', // Tăng kích thước của chữ trong helperText
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '20px', // Tăng kích thước của chữ trong InputLabel
                      },
                    }}
                    label={`Nhập đáp án ${option}`}
                    required
                    multiline
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedValue === option}
                        value={option}
                        onChange={handleChangeOption}

                      />
                    }
                    label={
                      <Typography variant="body1" style={{ fontSize: '20px' }}>
                        Chọn đáp án đúng
                      </Typography>
                    }
                    labelPlacement="end"
                    sx={{
                      fontSize: '20px',
                      mr: '3%'
                    }}
                  />
                </Box>
              ))
            }
          </Box>
        </Box>

        <Box mt='3%'>
          <Button sx={{ fontSize: '18px', ml: '85%' }} variant='contained' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button sx={{ fontSize: '18px', ml: '2%' }} variant='contained' >
            Add
          </Button>
        </Box>
      </Box>

    </Modal>
  )
}

export default AddQuestion