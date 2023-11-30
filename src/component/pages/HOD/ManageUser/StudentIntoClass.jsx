import React from 'react'
import { useState, useEffect } from 'react';
import { Modal, Box, Button, Grid } from '@mui/material';
import TextFieldBase from '../../common/TextFieldBase';
import { FetchClassCodes } from '../../common/callApi';

const StudentIntoClass = ({
  open,
  onClose,
  onSubmit,
  rows,
}) => {
  const [addData, setAddData] = useState({});
  const [error, setError] = useState('')
  const [classCodes, setClassCodes] = useState([])

  const handelOnChange = (e) => {
    console.log(e)
    const updatedData = { ...addData, ...e };
    console.log(updatedData)
    setAddData(updatedData);

  }
  const isExistClassCode = (value) => {
    return classCodes.some((element) => {
      let class_code = element && element.classCode ? element.classCode : '';
      return value.toString().toLowerCase().trim() === class_code.toLowerCase();
    });
  }
  const isInClass = (value) => {
    return rows.some((element) => {
      let class_code = element && element.classCode ? element.classCode : '';
      return value.toString().toLowerCase().trim() === class_code.toLowerCase();
    });
  }
  const handelOnChangeDetail = (e) => {
    const temp = { [e.name]: e.value }
    const updatedData = { ...addData, ...temp };
    setAddData(updatedData);
    var isExist = isExistClassCode(e.value);
    var isIn = isInClass(e.value)
    console.log(isExist)
    if (!isExist) {
      setError("That code doesn't exist");
    } else {
      if (isIn) {
        setError("Student have assigned to this class.");
      } else {
        setError('');
      }
    }
    console.log(e)
  }

  // Sử dụng useEffect để theo dõi sự thay đổi của editedData và log nó
  useEffect(() => {
    FetchClassCodes()
      .then(response => {
        console.log('Dữ liệu từ API:', response);
        setClassCodes(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });
  }, []);

  const handleSubmit = () => {
    // Thực hiện lưu các thay đổi
    if (error === '' && addData.classCode) {
      console.log(addData)
      onSubmit(addData);
      onClose();
    }

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
          width: '20%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
        }}
      >
        <h2 sx={{ m: 2 }} id="edit-modal-title">Thêm vào lớp</h2>
        <Grid container spacing={2} rowSpacing={2} justifyContent='flex-start'>
          <Grid item xs={12}>
            <TextFieldBase label='Class code' name='classCode' onChange={handelOnChange} onChangeDetail={handelOnChangeDetail} error={error} />
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

export default StudentIntoClass