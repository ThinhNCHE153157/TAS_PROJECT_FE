import { Box, Button, Collapse, IconButton, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const EditItemCard = ({
  isOpenEditItemCardModal,
  handleCloseEditItemCardModal,
  ItemCard,
  flashcardName,

}) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const [selectedImage, setSelectedImage] = useState(ItemCard.img);
  const handleImageChange = (event) => {
    event.preventDefault();
    // setCourseImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <Modal
      open={isOpenEditItemCardModal}
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
        <IconButton sx={{ width: '10px', left: '98%', padding: '0px 8px' }} onClick={handleCloseEditItemCardModal}>
          <CloseIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <Typography fontSize='35px' fontWeight='600'>
          Chỉnh sửa từ mới
        </Typography>
        <Typography fontSize='18px' mt='2%'>
          <strong>Flashcard :</strong>  {flashcardName}
        </Typography>
        <Box display='flex' flexDirection='column' mt='4%'>
          <Typography fontSize='18px' >
            Từ mới
          </Typography>
          <TextField sx={{ mt: '1%' }}
            defaultValue={ItemCard.newWord}
          />
          <Typography fontSize='18px' mt='3%'>
            Định nghĩa
          </Typography>
          <TextField
            defaultValue={ItemCard.defination}
            sx={{ mt: '1%' }}
            multiline rows={2}
          />
        </Box>

        <Box border='2px solid rgb(215 214 214)' borderRadius='10px' mt='2%'>
          <Button sx={{ textTransform: 'none', height: '60px', width: '100%', bgcolor: '#f7f7f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid rgb(215 214 214)' }} onClick={() => setIsOpenCollapse(!isOpenCollapse)}>
            <Typography fontWeight='bold' fontSize='18px'>
              Thêm phiên âm, ví dụ, ...
            </Typography>
            <ExpandMoreIcon />
          </Button>
          <Collapse in={isOpenCollapse} timeout="auto" unmountOnExit>
            <Box m='5% auto' width='90%' bgcolor='white' display='flex' flexDirection='column'>
              {selectedImage && (
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <Typography variant="h6" gutterBottom>
                  </Typography>
                  <img src={selectedImage} alt="Selected" style={{ width: 'auto', height: '200px' }} />
                </div>
              )}
              <Box display='flex' alignItems='center'>
                <Typography fontSize='18px' m='1% 2% 1% 0'>
                  Ảnh
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-input"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-input">
                  <Button component="span" color="primary" sx={{ fontSize: '15px', textTransform: 'none', bgcolor: '#efefef', color: 'black', border: '1px solid black' }}>
                    Chọn ảnh
                  </Button>
                </label>
              </Box>

              <Box display='flex' justifyContent='space-between' mt='3%'>
                <Box display='flex' flexDirection='column' width='48%'>
                  <Typography fontSize='18px' >
                    Loại từ (N, V, ADJ,..)
                  </Typography>
                  <TextField
                    sx={{ mt: '1%' }}
                    defaultValue={ItemCard.type}
                  />
                </Box>
                <Box display='flex' flexDirection='column' width='48%'>
                  <Typography fontSize='18px' >
                    Phiên âm
                  </Typography>
                  <TextField
                    sx={{ mt: '1%' }}
                    defaultValue={ItemCard.spelling}
                  />
                </Box>
              </Box>
              <Typography fontSize='18px' mt='3%'>
                Ví dụ
              </Typography>
              <TextField
                defaultValue={ItemCard.example}
                sx={{ mt: '1%' }}
                multiline
                rows={2}
              />

              <Typography fontSize='18px' mt='3%'>
                Ghi chú
              </Typography>
              <TextField
                defaultValue={ItemCard.note}
                sx={{ mt: '1%' }}
                multiline
                rows={2}
              />
            </Box>
          </Collapse>

        </Box>
        <Button sx={{ width: '70px', textTransform: 'none', mt: '4%', fontSize: '18px' }} variant='contained'>
          Thêm
        </Button>
      </Box>
    </Modal>
  )
}

export default EditItemCard