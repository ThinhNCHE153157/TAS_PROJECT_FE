import React, { useEffect } from 'react'
import TextEditor from '../../../../component/TextEditor'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const EditVideoModal = ({
  isOpenEditVideoModal,
  handleCloseEditVideoModal,
  handleEditVideo,
  selectedVideo: { videoId, videoTitle, videoDescription }
}) => {
  console.log(videoId)
  console.log(videoTitle)
  console.log(videoDescription)
  const [value, setValue] = useState(videoTitle)
  const [value1, setValue1] = useState(videoDescription)
  useEffect(() => {
    setValue(videoTitle);
    setValue1(videoDescription);
  }, [videoTitle, videoDescription])
  const handleAddButton = () => {
    const data = { videoTitle: value, videoId: videoId, videoDescription: value1 }
    handleEditVideo(data);
    handleCloseEditVideoModal();
  }
  return (
    <Modal
      open={isOpenEditVideoModal}
      onClose={handleCloseEditVideoModal}
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
          overflow: 'auto',
          maxHeight: '900px'
        }}
      >
        {/* Nội dung của modal */}
        <Typography id='modal-title' variant='h4' component='div'>
          Chỉnh sửa thông tin video
        </Typography>
        <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
          Video title
        </Typography>
        <TextField
          onChange={(event) => setValue(event.target.value)}
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
          placeholder='Title'
          value={value}
        />
        <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
          Mô tả
        </Typography>
        <TextEditor
          handleTextEditor={value => setValue1(value)}
          value={value1}
        />
        <Box mt='3%'>
          <Button sx={{ fontSize: '18px' }} variant='contained' onClick={handleCloseEditVideoModal}>
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

export default EditVideoModal