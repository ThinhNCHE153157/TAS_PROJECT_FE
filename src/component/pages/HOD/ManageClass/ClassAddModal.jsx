import { Box, Button, Grid, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextFieldBase from '../../common/TextFieldBase'
import { FetchAllTeacher, FetchClassCodes } from '../../common/CallAPI';
import DatePickerBase from '../../common/DatePickerBase';

const ClassAddModal = ({
  open,
  onClose,
  onSubmit,
  // errors,
  onChangeErrors,
  onChange
}) => {
  const [addData, setAddData] = useState({});
  const [errors, setErrors] = useState({
    err_className: '',
    err_numOfStudents: '',
    err_lecturer: '',
    err_classCode: '',
    err_description: '',
    err_startDate: '',
    err_endDate: ''
  })
  const [classCodes, setClassCodes] = useState([])
  const [teacherName, setTeacherName] = useState([])

  useEffect(() => {
    FetchClassCodes()
      .then(response => {
        console.log('Dữ liệu từ API:', response);
        setClassCodes(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });
    FetchAllTeacher()
      .then(response => {
        console.log('Dữ liệu từ API:', response);
        setTeacherName(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });

  }, []);

  const handleOnChangeStartDate = (e) => {
    var startDate = e.startDate ? e.startDate : '';
    var endDate = addData.endDate ? addData.endDate : '';
    if (startDate > endDate) {

    } else {

    }
  }
  const isExistClassCode = (value) => {
    return classCodes.some((element) => {
      let class_code = element && element.classCode ? element.classCode : '';
      return value.toString().toLowerCase().trim() === class_code.toLowerCase();
    });
  }
  const isExistTeacher = (value) => {
    return teacherName.some((element) => {
      let teacher = element && element.teacher ? element.teacher : '';
      return value.toString().toLowerCase().trim() === teacher.toLowerCase();
    });
  }
  const handleOnChangeTeacher = (value) => {
  }
  const handleOnChangeClassCode = (value) => {
    var classCode = value.classCode ? value.classCode : ''
    var isValid = isExistClassCode(classCode);
    if (isValid) {
      const updatedData = { ...addData, ...value }
      setAddData(updatedData);
      setErrors({ ...errors, err_classCode: '' })
    } else {
      setErrors({ ...errors, err_classCode: 'This code does not exist' })
    }
  }
  const handleOnChangeDetail = (e) => {
    console.log('e', e)
    if (!e.value) {
      onChangeErrors({ ['err_' + e.name]: 'You need to fill this field' })
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
    FetchClassCodes
      .then(response => {
        console.log(response)
        setClassCodes(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      })
    FetchAllTeacher
      .then(response => {
        console.log(response)
        setTeacherName(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);

      })
  }, []);

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
          <Grid item xs={6}>
            <TextFieldBase
              label='Class name'
              name='className'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_className ? errors.err_className : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Number Of Students'
              name='maxStudentInClass'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_className ? errors.err_numOfStudents : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Lecturer'
              name='teacher'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_className ? errors.err_lecturer : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Class Code'
              name='classCode'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_classCode ? errors.err_classCode : ''}
            />
          </Grid>
          <Grid item xs={9} >
            <TextFieldBase
              label='Description'
              name='description'
              onChange={handelOnChange}
              onChangeDetail={handleOnChangeDetail}
              isRequire={true}
              error={errors.err_className ? errors.err_description : ''}
              multiline={true}
              rows={4}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePickerBase
              label='Start Date'
              name='startDate'
              onChange={handleOnChangeStartDate}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePickerBase
              label='End Date'
              name='endDate'
              error={errors.err_endDate ? errors.err_endDate : ''}
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