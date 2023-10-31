import React from 'react'
import { useState, useEffect } from 'react';
import { Modal, Box, Button, Grid } from '@mui/material';
import TextFieldBase from '../../common/TextFieldBase';

const UserAdditionModal = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [addData, setAddData] = useState({});


  const handelOnChange = (e) => {
    console.log(addData)
    const updatedData = { ...addData, ...e };
    console.log(updatedData)
    setAddData(updatedData);

  }

  // Sử dụng useEffect để theo dõi sự thay đổi của editedData và log nó
  useEffect(() => {
  }, [addData]);

  const handleSubmit = () => {
    // Thực hiện lưu các thay đổi
    console.log(editedData)
    onSubmit(editedData);

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
        <h2 sx={{ m: 2 }} id="edit-modal-title">Thêm user</h2>
        <Grid container spacing={2} rowSpacing={2} justifyContent='flex-start'>
          <Grid item xs={7}>
            <TextFieldBase label='Email' name='email' onChange={handelOnChange} />
          </Grid>
          <Grid item xs={5}>
            <TextFieldBase label='Username' name='username' onChange={handelOnChange} />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase label='Phone' name='phone' onChange={handelOnChange} />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase label='First Name' name='first_name' onChange={handelOnChange} />
          </Grid>
          <Grid item xs={6} >
            <TextFieldBase label='Last Name' name='last_name' onChange={handelOnChange} />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <Button item onClick={handleSubmit}>Thêm</Button>
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

export default UserAdditionModal