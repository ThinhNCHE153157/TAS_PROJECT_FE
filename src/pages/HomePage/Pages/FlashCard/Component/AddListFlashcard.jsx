import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useEffect } from 'react';
const AddListFlashcard = ({
  isOpenAddFlashcard,
  onCloseAddFlashcard,
  handleAddFlashcard,
}) => {
  const [flashcardName, setFlashcardName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    setFlashcardName('');
    setDescription('');
  }, [isOpenAddFlashcard]);
  const handleAdd = () => {
    if (!flashcardName || !description) return alert('Vui lòng nhập đầy đủ thông tin');
    else {
      const newFlashcard = {
        flashcardName,
        description,
      }
      console.log(newFlashcard);
      handleAddFlashcard(newFlashcard);
      onCloseAddFlashcard();
    }
  }
  return (
    <Modal
      open={isOpenAddFlashcard}
      onClose={onCloseAddFlashcard}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          width: '35%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '5px',
          overflowY: 'auto',
          maxHeight: '90%'
        }}
      >
        <IconButton
          sx={{ width: '10px', left: '98%', padding: '0px 8px' }}
          onClick={onCloseAddFlashcard}
        >
          <CloseIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <Typography fontSize='35px' fontWeight='600'>
          Tạo list từ
        </Typography>
        <Box display='flex' flexDirection='column' mt='4%'>
          <Typography fontSize='18px' >
            Tiêu đề*
          </Typography>
          <TextField
            sx={{ mt: '1%' }}
            name='flashcardName'
            value={flashcardName}
            onChange={(e) => setFlashcardName(e.target.value)}
          />
          <Typography fontSize='18px' mt='3%'>
            Mô tả*
          </Typography>
          <TextField sx={{ mt: '1%' }}
            multiline rows={2}
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Button sx={{ width: '70px', textTransform: 'none', mt: '4%', fontSize: '18px' }} variant='contained'
          onClick={handleAdd}
        >
          Thêm
        </Button>
      </Box>

    </Modal>
  )
}

export default AddListFlashcard