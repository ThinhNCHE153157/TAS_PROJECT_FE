import React from 'react'
import { useState, useEffect } from 'react';
import { Modal, Box, Button, Grid } from '@mui/material';
import TextFieldBase from '../../common/TextFieldBase';

const EditCourseModal = ({
  open,
  onClose,
  rowToEdit,
  onSave,
}) => {
  const [editedData, setEditedData] = useState({});


  const handelOnChange = (e) => {
    console.log(editedData)
    const updatedData = { ...editedData, ...e };
    console.log(updatedData)
    setEditedData(updatedData);
  }

  // Sử dụng useEffect để theo dõi sự thay đổi của editedData và log nó
  useEffect(() => {
    setEditedData(rowToEdit)
  }, [rowToEdit]);

  const handleSave = () => {
    // Thực hiện lưu các thay đổi
    console.log(editedData)
    onSave(editedData);
    onClose();
  };


  const handleClose = () => {
    onClose();
  }





  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
        }}
      >
        <h2 sx={{ m: 2 }} id="edit-modal-title">Chỉnh sửa thông tin</h2>
        <Grid container spacing={2} rowSpacing={2} justifyContent='flex-start'>
          <Grid item xs={7}>
            <TextFieldBase defaultValue={rowToEdit && rowToEdit.email ? rowToEdit.email : ''} label='Email' name='email' disable={true} id='outlined-disable' />
          </Grid>
          <Grid item xs={5}>
            <TextFieldBase defaultValue={rowToEdit && rowToEdit.username ? rowToEdit.username : ''} label='Username' name='username' disable={true} id='outlined-disable' />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase defaultValue={rowToEdit && rowToEdit.phone ? rowToEdit.phone : ''} label='Phone' name='phone' onChange={handelOnChange} />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase defaultValue={rowToEdit && rowToEdit.first_name ? rowToEdit.first_name : ''} label='First Name' name='first_name' onChange={handelOnChange} />
          </Grid>
          <Grid item xs={6} >
            <TextFieldBase defaultValue={rowToEdit && rowToEdit.last_name ? rowToEdit.last_name : ''} label='Last Name' name='last_name' onChange={handelOnChange} />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <Button item onClick={handleSave}>Lưu</Button>
            </Grid>
            <Grid item xs={3}>
              <Button item onClick={handleClose}>Hủy</Button>
            </Grid>
          </Grid>
        </Grid>


      </Box>
    </Modal>
  );
}

export default EditCourseModal