import { Box, Button, Collapse, IconButton, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { CreateFlashCardItem } from '../../../../../Services/FlascardService';

const AddNewWord = ({
  isOpenAddNewWordModal,
  flashcardName,
  handleCloseAddNewWordModal,
  flashcardId,
  doRefresh
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newWord, setNewWord] = useState('')
  const [defination, setDefination] = useState('')
  const [example, setExample] = useState('')
  const [note, setNote] = useState('')
  const [type, setType] = useState('')
  const [spelling, setSpelling] = useState('')
  const [Image, setImage] = useState(null)
  const handleImageChange = (event) => {
    event.preventDefault();
    // setCourseImage(event.target.files[0]);
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewWord = () => {
    if (!newWord || !defination) return alert('Vui lòng nhập đầy đủ thông tin');
    else {
      const form = new FormData();
      form.append('flashcardId', flashcardId);
      form.append('newWord', newWord);
      form.append('defination', defination);
      form.append('example', example);
      form.append('note', note);
      form.append('type', type);
      form.append('spelling', spelling);
      form.append('image', Image);
      console.log(form);
      CreateFlashCardItem(form).then(res => {
        console.log(res)
        alert('Thêm từ mới thành công')
        handleCloseAddNewWordModal();
      }).catch(err => {
        console.log(err)
        alert('Thêm từ mới thất bại')
      })
      // handleAddFlashcard(newFlashcard);
      // onCloseAddFlashcard();
    }
  }
  return (
    <Modal
      open={isOpenAddNewWordModal}
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
        <IconButton sx={{ width: '10px', left: '98%', padding: '0px 8px' }} onClick={handleCloseAddNewWordModal}>
          <CloseIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <Typography fontSize='35px' fontWeight='600'>
          Thêm từ mới
        </Typography>
        <Typography fontSize='18px' mt='2%'>
          <strong>Flashcard :</strong>  {flashcardName}
        </Typography>
        <Box display='flex' flexDirection='column' mt='4%'>
          <Typography fontSize='18px' >
            Từ mới
          </Typography>
          <TextField sx={{ mt: '1%' }}
            name='newWord'
            onChange={(e) => setNewWord(e.target.value)}
            defaultValue={newWord}
          />
          <Typography fontSize='18px' mt='3%'>
            Định nghĩa
          </Typography>
          <TextField sx={{ mt: '1%' }} multiline rows={2}
            name='defination'
            onChange={(e) => setDefination(e.target.value)}
            defaultValue={defination}
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
                  <TextField sx={{ mt: '1%' }}
                    name='type'
                    onChange={(e) => setType(e.target.value)}
                    defaultValue={type}
                  />
                </Box>
                <Box display='flex' flexDirection='column' width='48%'>
                  <Typography fontSize='18px' >
                    Phiên âm
                  </Typography>
                  <TextField sx={{ mt: '1%' }}
                    name='spelling'
                    onChange={(e) => setSpelling(e.target.value)}
                    defaultValue={spelling}
                  />
                </Box>
              </Box>
              <Typography fontSize='18px' mt='3%'>
                Ví dụ
              </Typography>
              <TextField sx={{ mt: '1%' }} multiline rows={2}
                name='example'
                onChange={(e) => setExample(e.target.value)}
                defaultValue={example}
              />

              <Typography fontSize='18px' mt='3%'>
                Ghi chú
              </Typography>
              <TextField sx={{ mt: '1%' }} multiline rows={2}
                name='note'
                onChange={(e) => setNote(e.target.value)}
                defaultValue={note}
              />
            </Box>
          </Collapse>

        </Box>
        <Button sx={{ width: '70px', textTransform: 'none', mt: '4%', fontSize: '18px' }} variant='contained'
          onClick={() => handleAddNewWord()}
        >
          Thêm
        </Button>
      </Box>
    </Modal >
  )
}

export default AddNewWord