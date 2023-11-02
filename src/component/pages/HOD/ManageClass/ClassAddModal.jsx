import { Box, Button, Grid, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextFieldBase from '../../common/TextFieldBase'

const ClassAddModal = ({
  open,
  onClose,
  onSubmit,
  errors,
  onChangeErrors,
  onChange
}) => {
  const [addData, setAddData] = useState({});

  const handleOnChangeDetail = (e) => {
    console.log('e', e)
    if (!e.value) {
      onChangeErrors({ ['err_' + e.name]: 'You need to field this field' })
    } else {
      const newE = { [e.name]: e.value }
      const updatedData = { ...addData, ...newE };
      setAddData(updatedData)
      onChange(updatedData);
      onChangeErrors({ ['err_' + e.name]: '' })
    }
  }
  const handelOnChange = (e) => {
    const updatedData = { ...addData, ...e };
    console.log(updatedData)
    setAddData(updatedData);
    onChange(updatedData);
  }



  // Sử dụng useEffect để theo dõi sự thay đổi của editedData và log nó
  useEffect(() => {
  }, [addData]);

  const handleSubmit = () => {
    // Thực hiện lưu các thay đổi
    console.log(addData)
    onSubmit(addData);
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
            <TextFieldBase
              label='Class name'
              name='className'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_className ? errors.err_className : ''}
            />
          </Grid>
          <Grid item xs={5}>
            <TextFieldBase
              label='Number Of Students'
              name='numOfStudents'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_className ? errors.err_numOfStudents : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Lecturer'
              name='lecturer'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_className ? errors.err_lecturer : ''}
            />
          </Grid>
          <Grid item xs={6} >
            <TextFieldBase
              label='Description'
              name='description'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_className ? errors.err_description : ''}
            />
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
  )
}

export default ClassAddModal