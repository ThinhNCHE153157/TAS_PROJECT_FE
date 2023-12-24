import { Box, Button, FormControlLabel, InputLabel, Modal, Radio, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';

const options = ['A', 'B', 'C', 'D'];
const AddQuestion = ({
  isOpenModal,
  handleCloseModal,
  handleAdd,
  testId
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [obj, setObj] = useState({ 'testId': testId })
  const [error, setError] = useState('')
  const handleChangeOption = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {

  }, [error])
  const isValidObj = (obj) => {
    if (Object.keys(obj).length !== 7) {
      return false;
    }
    for (const key in obj) {
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  }
  const handAddButton = () => {
    var correctAnswer = obj[selectedValue]
    var updateData = { ...obj, 'correctAnswer: ': correctAnswer }
    if (isValidObj(updateData)) {
      handleAdd(updateData)
      setError('')
    } else {
      setError('*Bạn phải nhập đủ các trường và chọn đáp án đúng')
    }

  }

  const handleChangeText = (event) => {
    console.log('event: ', event)
    var name = event.target.name
    var text = event.target.value
    var updateData = { ...obj, [name]: text }
    console.log('updateData: ', updateData)
    setObj(updateData)
  }
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
            name='description'
            onChange={handleChangeText}
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
                    onChange={handleChangeText}
                    required
                    name={option}
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
          <Typography ml='1%' color='red' fontSize='18px'>{error} </Typography>
        </Box>

        <Box mt='3%' ml='40%'>
          <Button sx={{ fontSize: '18px', mr: '10px' }} variant='contained' onClick={handAddButton}  >
            Add
          </Button>
          <Button sx={{ fontSize: '18px' }} variant='contained' onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Box>

    </Modal>
  )
}

export default AddQuestion