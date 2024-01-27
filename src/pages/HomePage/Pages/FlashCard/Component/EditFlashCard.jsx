import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
const EditFlashCard = (
  {
    isOpenEditFlashCardModal,
    handleCloseEditFlashCardModal,
    handleEdit,
    flashcardName,
    description,
  }
) => {
  return (
    <Modal
      open={isOpenEditFlashCardModal}
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
        <IconButton sx={{ width: '10px', left: '98%', padding: '0px 8px' }} onClick={handleCloseEditFlashCardModal}>
          <CloseIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <Typography fontSize='35px' fontWeight='600'>
          Chỉnh sửa flashcard
        </Typography>
        <Box display='flex' flexDirection='column' mt='4%'>
          <Typography fontSize='18px' >
            Tiêu đề *
          </Typography>
          <TextField sx={{ mt: '1%' }} defaultValue={flashcardName} />
          <Typography fontSize='18px' mt='2%'>
            Mô tả *
          </Typography>
          <TextField sx={{ mt: '1%' }} multiline rows={2} defaultValue={description} />
        </Box>
        <Box display='flex' justifyContent='space-between' mt='3%'>
          <Button
            sx={{
              textTransform: 'none',
              fontSize: '18px',
              bgcolor: '#1976d2',
              color: '#fff',
              '&:hover': {
                bgcolor: '#115293',
                boxShadow: 'none',
              },
              '&:active': {
                bgcolor: '#115293',
                boxShadow: 'none',
              },
            }}
            onClick={handleEdit}
          >
            Lưu
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              fontSize: '18px',
              bgcolor: '#cd3131',
              color: '#fff',
              '&:hover': {
                bgcolor: '#115293',
                boxShadow: 'none',
              },
              '&:active': {
                bgcolor: '#115293',
                boxShadow: 'none',
              },
            }}
            onClick={handleEdit}
          >
            Xóa
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditFlashCard