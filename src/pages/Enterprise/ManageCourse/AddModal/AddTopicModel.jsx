import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const AddTopicModel = ({
  isModalOpen,
  handleCloseModal,
  handleAdd,

}) => {
  const [value, setValue] = useState('')
  const [value1, setValue1] = useState('')
  const handleAddButton = () => {
    handleAdd(value.target.value, value1.target.value);
  }
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          width: '30%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          overflowY: 'auto',
          maxHeight: '900px'
        }}
      >
        {/* Nội dung của modal */}
        <Typography id='modal-title' variant='h4' component='div'>
          Thêm topic mới
        </Typography>
        <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
          Tên topic
        </Typography>
        <TextField
          onChange={(value) => setValue(value)}
          component='div'
          sx={{
            mt: '1%',
            width: '90%',
            '& .MuiInputBase-input': {
              fontSize: '20px', // Tăng kích thước của chữ trong TextField
            },
            '& .MuiFormHelperText-root': {
              fontSize: '18px', // Tăng kích thước của chữ trong helperText
            },
          }}
          placeholder='Topic'
        />
        <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
          Mô tả
        </Typography>
        <TextField
          onChange={(value) => setValue1(value)}
          component='div'
          rows={2}
          sx={{
            mt: '1%',
            width: '90%',
            '& .MuiInputBase-input': {
              fontSize: '20px', // Tăng kích thước của chữ trong TextField
            },
            '& .MuiFormHelperText-root': {
              fontSize: '18px', // Tăng kích thước của chữ trong helperText
            },
          }}
          placeholder='Mô tả'
        />
        <Box mt='3%'>
          <Button sx={{ fontSize: '18px' }} variant='contained' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button sx={{ fontSize: '18px', ml: '2%' }} variant='contained' onClick={handleAddButton}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default AddTopicModel